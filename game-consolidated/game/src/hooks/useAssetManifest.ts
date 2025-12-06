import { useEffect, useState } from 'react';
import type { AssetPlaceholder } from '../assets/assetManifest';
import { ASSET_MANIFEST } from '../assets/assetManifest';

export const useAssetManifest = () => {
  const [records, setRecords] = useState<AssetPlaceholder[]>([]);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) {
        setRecords(ASSET_MANIFEST);
      }
    }, 150);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return records;
};
