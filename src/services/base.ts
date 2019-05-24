import _ from 'lodash';
import { from, Observable } from 'rxjs';

const baseUrl = '/api/';

export type HttpParams = {
  [key: string]: number | string | undefined;
};

/**
 * Encode url parameters to querystring.
 */
export function urlencode(params: { [key: string]: string | number | undefined | null }) {
  return _.chain(params)
    .pickBy(v => !_.isUndefined(v) && !_.isNull(v))
    .map(
      (v: string | number, k) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .value()
    .join('&');
}

/**
 * Returns full URL.
 * @param path API path.
 */
export const getUrl = (path: string) => (path.startsWith('/') ? path : baseUrl + path);

/**
 * Common request.
 * @param method HTTP method.
 * @param path API path.
 * @param params HTTP querystring parameters.
 * @param data POST/PUT data.
 */
const request = async <T>(
  method: string,
  path: string,
  options: {
    params?: HttpParams;
    data?: any;
  },
): Promise<T> => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  const querystring = urlencode(options.params || {});
  const url = getUrl(path) + (querystring ? '?' + querystring : '');

  const init: RequestInit = { method, headers };

  if (options.data) {
    init.body = JSON.stringify(options.data);
  }

  const res = await fetch(url, init);
  if (res.headers.get('Content-Type') === 'application/json') {
    return res.json() as Promise<T>;
  } else {
    throw Error('Non-JSON response');
  }
};

////////////////////////////////////
// HTTP requests (promise version)

export const get = <T>(path: string, params?: HttpParams) =>
  request<T>('GET', path, { params });

export const post = <T>(path: string, data: Partial<T>, params?: HttpParams) =>
  request<T>('POST', path, { params, data });

export const put = <T>(path: string, data: Partial<T>, params?: HttpParams) =>
  request<T>('PUT', path, { params, data });

export const delete_ = (path: string, params?: HttpParams) =>
  request('DELETE', path, { params });

export const patch = <T>(path: string, data: Partial<T>, params?: HttpParams) =>
  request<T>('PATCH', path, { params, data });

export const upload = (url: string, file: File) =>
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  });

/**
 * Common request, Observable version.
 * @param method HTTP method.
 * @param path API path.
 * @param params HTTP querystring parameters.
 * @param data POST/PUT data.
 */
const request$ = <T>(
  method: string,
  path: string,
  options: { params?: HttpParams; data?: any },
): Observable<T> => from(request<T>(method, path, options));

//////////////////////////////////////
// HTTP requests (observable version)

export const get$ = <T>(path: string, params?: HttpParams) =>
  request$<T>('GET', path, { params });

export const post$ = <T>(path: string, data: Partial<T>, params?: HttpParams) =>
  request$<T>('POST', path, { params, data });

export const put$ = <T>(path: string, data: Partial<T>, params?: HttpParams) =>
  request$<T>('PUT', path, { params, data });

export const delete$ = (path: string, params?: HttpParams) =>
  request$('DELETE', path, { params });

export const patch$ = <T>(path: string, data: Partial<T>, params?: HttpParams) =>
  request$<T>('PATCH', path, { params, data });
