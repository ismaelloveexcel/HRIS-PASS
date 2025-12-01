import type { AssetPlaceholder } from '../assets/assetManifest';

interface AssetPipelinePanelProps {
  assets: AssetPlaceholder[];
}

const statusCopy: Record<AssetPlaceholder['status'], string> = {
  mocked: 'Mocked in UI',
  captured: 'Captured & awaiting import',
  todo: 'Not captured yet',
};

export const AssetPipelinePanel = ({ assets }: AssetPipelinePanelProps) => (
  <section className="asset-panel">
    <header>
      <p className="asset-label">VR Asset Pipeline</p>
      <small>{assets.length} tracked items</small>
    </header>
    <ul>
      {assets.map((asset) => (
        <li key={asset.id}>
          <div>
            <p className="asset-name">{asset.label}</p>
            <small>{asset.description}</small>
          </div>
          <div className="asset-meta">
            <span className={`asset-pill asset-${asset.status}`}>{statusCopy[asset.status]}</span>
            <span className="asset-size">{asset.estimatedSizeMB} MB</span>
          </div>
        </li>
      ))}
    </ul>
  </section>
);
