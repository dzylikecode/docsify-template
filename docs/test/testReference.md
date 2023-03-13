# test reference

> This is a quote from Donald Duck literature[^duck].

At the implementation level, JavaScript's arrays actually store their elements as standard object properties, using the array index as the property name.

The length property is special. Its value is always a positive integer greater than the index of the last element if one exists. (In the example below, 'Dusty' is indexed at 30, so cats.length returns 30 + 1).

Remember, JavaScript Array indexes are 0-based: they start at 0, not 1. This means that the length property will be one more than the highest index stored in the array:

```js
const sparseArray = ["first", "second", , "fourth"];

sparseArray.forEach((element) => {
  console.log(element);
});
// Logs:
// first
// second
// fourth

if (sparseArray[2] === undefined) {
  console.log("sparseArray[2] is undefined"); // true
}

const nonsparseArray = ["first", "second", undefined, "fourth"];

nonsparseArray.forEach((element) => {
  console.log(element);
});
// Logs:
// first
// second
// undefined
// fourth
```

> But python doesn't think so[^python].

## reference

1. [-duck] life is too short, I use python

   is this entertaining?

2. [-python] why cue me?
