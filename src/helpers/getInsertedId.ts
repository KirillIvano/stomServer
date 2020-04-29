interface InsertionResultType {
    generatedMaps: {id?: number}[];
}

export const getInsertedId = ({
    generatedMaps: [{id}],
}: InsertionResultType) => id;
