export function ThrowExpression(errorMsg: string): never{
    throw new Error(errorMsg);
}