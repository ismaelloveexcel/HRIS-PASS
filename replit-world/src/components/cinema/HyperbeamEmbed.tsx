import { useEffect, useRef } from 'react';

interface Props {
  embedUrl: string;
  onClose: () => void;
}

const HyperbeamEmbed = ({ embedUrl, onClose }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data === 'hyperbeam:close') {
        onClose();
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [onClose]);

  return (
    <div className="hyperbeam-overlay">
      <div className="hyperbeam-frame">
        <iframe ref={iframeRef} src={embedUrl} allow="camera; microphone; clipboard-write" title="Hyperbeam" />
        <button type="button" onClick={onClose}>
          End session
        </button>
      </div>
    </div>
  );
};

export default HyperbeamEmbed;
