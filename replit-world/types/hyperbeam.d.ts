declare module 'hyperbeam' {
  interface CreateSessionOptions {
    url?: string;
  }

  interface HyperbeamSession {
    id: string;
    embed_url: string;
    admin_token: string;
  }

  export default class Hyperbeam {
    constructor(options: { apiKey: string });
    sessions: {
      create(options: CreateSessionOptions): Promise<HyperbeamSession>;
    };
  }
}
