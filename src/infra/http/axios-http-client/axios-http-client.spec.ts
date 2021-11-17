import { AxiosHttpClient } from './axios-http-client'

import { mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'

import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response on axios.post', () => {
      const { sut, mockedAxios } = makeSut()

      const promise = sut.post(mockPostRequest())

      const { mock } = mockedAxios.post
      const resolvedValue = 0

      expect(promise).toEqual(mock.results[resolvedValue].value)
    })

    test('Should return the correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.post(mockPostRequest())

      const { mock } = mockedAxios.post
      const resolvedValue = 0

      expect(promise).toEqual(mock.results[resolvedValue].value)
    })
  })
})
