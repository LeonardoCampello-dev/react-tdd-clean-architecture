import { AxiosHttpClient } from './axios-http-client'

import { mockGetRequest, mockPostRequest } from '@/data/test'
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

    test('Should return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.post(mockPostRequest())

      const { mock } = mockedAxios.post
      const axiosResponse = await mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
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

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.get(mockGetRequest())

      const { mock } = mockedAxios.get
      const axiosResponse = await mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('Should return the correct error on axios.get', () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.get(mockGetRequest())

      const { mock } = mockedAxios.get
      const resolvedValue = 0

      expect(promise).toEqual(mock.results[resolvedValue].value)
    })
  })
})
