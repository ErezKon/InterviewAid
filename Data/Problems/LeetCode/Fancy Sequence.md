# 1622. Fancy Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/fancy-sequence](https://leetcode.com/problems/fancy-sequence)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Write an API that generates fancy sequences using the `append`, `addAll`, and `multAll` operations.

Implement the `Fancy` class:

- `Fancy()` Initializes the object with an empty sequence.
- `void append(val)` Appends an integer `val` to the end of the sequence.
- `void addAll(inc)` Increments all existing values in the sequence by an integer `inc`.
- `void multAll(m)` Multiplies all existing values in the sequence by an integer `m`.
- `int getIndex(idx)` Gets the current value at index `idx` (0-indexed) of the sequence **modulo** `10⁹ + 7`. If the index is greater or equal than the length of the sequence, return `-1`.

**Constraints:**

- `1 ≤ val, inc, m ≤ 100`
- `0 ≤ idx ≤ 10⁵`
- At most `10⁵` calls total will be made to `append`, `addAll`, `multAll`, and `getIndex`.

---

## Examples

```
Example 1:
  Input:
  ["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
  [[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
  Output:
  [null, null, null, null, null, 10, null, null, null, 26, 34, 20]
  Explanation:
  Fancy fancy = new Fancy();
  fancy.append(2);   // fancy sequence: [2]
  fancy.addAll(3);   // fancy sequence: [2+3] -> [5]
  fancy.append(7);   // fancy sequence: [5, 7]
  fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]
  fancy.getIndex(0); // return 10
  fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]
  fancy.append(10);  // fancy sequence: [13, 17, 10]
  fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
  fancy.getIndex(0); // return 26
  fancy.getIndex(1); // return 34
  fancy.getIndex(2); // return 20
```

---

## Approach: Lazy Affine Transformation — O(1) per operation ✅

```text
CLASS Fancy:
    MOD = 10^9 + 7
    vals = []
    mults = []
    adds = []
    globalMult = 1
    globalAdd = 0

    FUNCTION append(val):
        // Store the "inverse" of current global transform
        vals.ADD(val)
        mults.ADD(globalMult)
        adds.ADD(globalAdd)

    FUNCTION addAll(inc):
        globalAdd = (globalAdd + inc) % MOD

    FUNCTION multAll(m):
        globalMult = (globalMult * m) % MOD
        globalAdd = (globalAdd * m) % MOD

    FUNCTION getIndex(idx):
        IF idx >= len(vals): RETURN -1
        // Apply delta transform since append time
        m = globalMult * MODINV(mults[idx]) % MOD
        a = (globalAdd - adds[idx] * m) % MOD
        RETURN (vals[idx] * m + a) % MOD
```

---

## Walkthrough

Consider the sequence of operations:
1. `append(2)` → store (2, mult=1, add=0)
2. `addAll(3)` → globalAdd=3
3. `append(5)` → store (5, mult=1, add=3)
4. `multAll(2)` → globalMult=2, globalAdd=6
5. `getIndex(0)` → m = 2 * MODINV(1) = 2, a = 6 - 0*2 = 6 → result = 2*2+6 = 10
6. `getIndex(1)` → m = 2 * MODINV(1) = 2, a = 6 - 3*2 = 0 → result = 5*2+0 = 10

---

## Complexity Analysis

| Operation | Complexity |
|-----------|-----------|
| **append** | O(1) |
| **addAll/multAll** | O(1) |
| **getIndex** | O(log MOD) for modular inverse |

---

## Follow-Up Questions

- How would you extend this structure to support `subtractAll`?
- Can you adapt the design for a streaming environment where values arrive continuously?
- What changes are needed if the modulus is not prime?

---

## Key Takeaway

> **Lazy affine transformations: compose multiply/add into a global `(mult, add)` state. On query, compute the delta transform since insertion using modular inverse. Avoids updating all elements on each operation.**