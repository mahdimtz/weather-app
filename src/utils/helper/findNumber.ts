type ComparisonFlag = 'max' | 'min';

function findExtreme(arr: number[]| undefined, flag: ComparisonFlag): number | undefined {

  if (arr?.length === 0) {
    return 
  }

  return arr?.reduce((extreme, current) => {
    if (flag === 'max') {
      return current > extreme ? current : extreme;
    } else {
      return current < extreme ? current : extreme;
    }
  });
}
export {findExtreme}