"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FlushFormValues } from "@/lib/types";
import type { AssetDetailResponse } from "./useAssetDetail";
import type { SiteAssetsResponse } from "./useSiteAssets";

async function recordFlush(values: FlushFormValues) {
  const response = await fetch(`/api/assets/${values.assetId}/flush`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      time: values.time,
      temperature: values.temperature,
      duration: values.duration,
      note: values.note,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to record flush");
  }

  return response.json();
}

export function useRecordFlush() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recordFlush,
    onMutate: async (values) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["assets", values.assetId] }),
        queryClient.cancelQueries({ queryKey: ["sites", values.siteId, "assets"] }),
      ]);

      const previousAsset = queryClient.getQueryData<AssetDetailResponse>(["assets", values.assetId]);
      const previousLists = queryClient.getQueriesData<SiteAssetsResponse>({
        queryKey: ["sites", values.siteId, "assets"],
      });

      queryClient.setQueryData<AssetDetailResponse | undefined>(["assets", values.assetId], (current) => {
        if (!current?.asset) {
          return current ?? undefined;
        }
        return {
          asset: {
            ...current.asset,
            lastFlush: values.time,
            overdue: false,
          },
        };
      });

      queryClient.setQueriesData<SiteAssetsResponse | undefined>(
        {
          queryKey: ["sites", values.siteId, "assets"],
        },
        (data) => {
          if (!data) {
            return data;
          }
          return {
            assets: data.assets.map((asset) =>
              asset.id === values.assetId
                ? {
                    ...asset,
                    lastFlush: values.time,
                    overdue: false,
                  }
                : asset,
            ),
          };
        },
      );

      return { previousAsset, previousLists };
    },
    onError: (_error, values, context) => {
      if (context?.previousAsset) {
        queryClient.setQueryData(["assets", values.assetId], context.previousAsset);
      }
      if (context?.previousLists) {
        context.previousLists.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }
    },
    onSuccess: (_data, values) => {
      queryClient.invalidateQueries({ queryKey: ["assets", values.assetId] });
      queryClient.invalidateQueries({ queryKey: ["sites", values.siteId, "assets"] });
    },
  });
}
