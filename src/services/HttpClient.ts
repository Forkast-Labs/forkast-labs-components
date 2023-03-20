export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export class HttpClient {
  static async get<T = any>(url: string): Promise<HttpResponse<T>> {
    return await this.request<T>('GET', url);
  }

  private static async request<T>(
    method: string,
    url: string
  ): Promise<HttpResponse<T>> {
    const headers = new Headers();

    headers.set('Content-Type', 'application/json');

    const response: HttpResponse<T> = await fetch(url, {
      headers: headers,
      method: method,
    });

    if (response.status === 200) {
      response.parsedBody = await response.json();
    }

    return response;
  }
}
