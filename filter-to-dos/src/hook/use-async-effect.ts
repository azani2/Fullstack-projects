import { useEffect } from "react"

type AsyncEffect<V> = (isUpdateValid?: () => boolean) => Promise<V>
type Destructor<V> = (prevResult?: V) => void

export default function useAsyncEffect<V>(effect: AsyncEffect<V>, dependencies?: ReadonlyArray<unknown>, destroy?: Destructor<V>) {
    useEffect(() => {
        let result: V
        let validUpdate = true
        const maybePromise = effect(() => {return validUpdate})

        Promise.resolve(maybePromise).then(value => {result = value})

        return function () {
            validUpdate = false
            if (destroy) {
                destroy(result)
            }
        }
    }, dependencies)
}