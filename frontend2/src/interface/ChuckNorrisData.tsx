export interface ChuckNorrisData {
  type: ChuckNorrisDataType,
  value: ChuckNorrisValue
}

export interface ChuckNorrisValue {
  id: number,
  joke: string
}

export enum ChuckNorrisDataType {
  SUCCESS = "success",
  EXCEPTION_NO_QUOTE = "NoSuchQuoteException"
}