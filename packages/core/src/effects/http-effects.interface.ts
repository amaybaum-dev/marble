import { HttpRequest, HttpStatus, HttpHeaders, HttpServer } from '../http.interface';
import { HttpError } from '../error/error.model';
import { Event } from '../event/event.interface';
import { Effect } from './effects.interface';

export interface HttpEffectResponse<T = any> {
  status?: HttpStatus;
  headers?: HttpHeaders;
  body?: T;
}

export interface HttpMiddlewareEffect<
  I extends HttpRequest = HttpRequest,
  O extends HttpRequest = HttpRequest,
> extends HttpEffect<I, O> {}

export interface HttpErrorEffect<
  Err extends Error = HttpError,
> extends HttpEffect<{ req: HttpRequest; error: Err }, HttpEffectResponse> {}

export interface HttpServerEffect<
  Ev extends Event = Event
> extends HttpEffect<Ev, any, HttpServer> {}

export interface HttpOutputEffect<
  Req extends HttpRequest = HttpRequest,
  Res extends HttpEffectResponse = HttpEffectResponse
> extends HttpEffect<{ req: Req; res: Res }, HttpEffectResponse> {}

export interface HttpEffect<
  I = HttpRequest,
  O = HttpEffectResponse,
  Client = HttpServer,
> extends Effect<I, O, Client> {}
