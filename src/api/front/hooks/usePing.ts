import { useQuery } from '@tanstack/react-query'
import { ping } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const usePing = (token: Schema.Token) =>
  useQuery<
    Schema.Api.Ping.Response.Success.Body,
    FetchError<Schema.Api.Ping.Response.Error.Body>
  >({
    queryKey: ['ping', token],
    queryFn: () => ping(token),
    enabled: false,
  })
