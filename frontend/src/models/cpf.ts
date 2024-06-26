export default class CPF {
    private value: string
    private emissionDate: Date
    constructor(value: string, emissionDate: Date) {
        this.value = value
        this.emissionDate = emissionDate
    }
    public get getValue(): string {
        return this.value
    }
    public get getEmissionDate(): Date {
        return this.emissionDate
    }
}