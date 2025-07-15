export interface CFImageOptions {
  width?: number;
  height?: number;
  format?: string;
  quality?: number | string;
  loading?: string;
  decoding?: string;
  fetchpriority?: string;
}

export function cfImage(src: string, alt: string, opts: CFImageOptions = {}) {
  const url = new URL(src);
  const path = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
  const params: string[] = [];
  if (opts.width) params.push(`width=${opts.width}`);
  if (opts.height) params.push(`height=${opts.height}`);
  if (opts.format) params.push(`format=${opts.format}`);
  if (opts.quality) params.push(`quality=${opts.quality}`);
  const options = params.join(',');
  const cfUrl = `${url.origin}/cdn-cgi/image/${options}/${path}`;
  return {
    src: cfUrl,
    attributes: {
      alt,
      width: opts.width,
      height: opts.height,
      loading: opts.loading,
      decoding: opts.decoding,
      fetchpriority: opts.fetchpriority,
    },
  };
}
