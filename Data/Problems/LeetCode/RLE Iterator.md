# 900. RLE Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rle-iterator](https://leetcode.com/problems/rle-iterator)
**Companies:** Databricks, Google

---

## Problem Description

We can use run-length encoding (i.e., **RLE**) to encode a sequence of integers. In a run-length encoded array of even length `encoding` (**0-indexed**), for all even `i`, `encoding[i]` tells us the number of times that the non-negative integer value `encoding[i + 1]` is repeated in the sequence.

- For example, the sequence `arr = [8,8,8,5,5]` can be encoded to be `encoding = [3,8,2,5]`. `encoding = [3,8,0,9,2,5]` and `encoding = [2,8,1,8,2,5]` are also valid **RLE** of `arr`.

Given a run-length encoded array, design an iterator that iterates through it.

Implement the `RLEIterator` class:

- `RLEIterator(int[] encoded)` Initializes the object with the encoded array `encoded`.
- `int next(int n)` Exhausts the next `n` elements and returns the last element exhausted in this way. If there is no element left to exhaust, return `-1` instead.

**Constraints:**

- `2 <= encoding.length <= 1000`
- `encoding.length` is even.
- `0 <= encoding[i] <= 10⁹`
- `1 <= n <= 10⁹`
- At most `1000` calls will be made to `next`.

---

## Examples

```
Example 1:
  Input: ["RLEIterator", "next", "next", "next", "next"]
         [[[3, 8, 0, 9, 2, 5]], [2], [1], [1], [2]]
  Output: [null, 8, 8, 5, -1]
  Explanation:
    RLEIterator rLEIterator = new RLEIterator([3, 8, 0, 9, 2, 5]); // This maps to the sequence [8,8,8,5,5].
    rLEIterator.next(2); // exhausts 2 terms of the sequence, returning 8. The remaining sequence is now [8, 5, 5].
    rLEIterator.next(1); // exhausts 1 term of the sequence, returning 8. The remaining sequence is now [5, 5].
    rLEIterator.next(1); // exhausts 1 term of the sequence, returning 5. The remaining sequence is now [5].
    rLEIterator.next(2); // exhausts 2 terms, returning -1. This is because the first term exhausted was 5,
                         // but the second term did not exist. Since the last term exhausted does not exist, we return -1.
```

## Approach

```
CLASS RLEIterator:
    INIT(encoding):
        self.encoding ← encoding
        self.index ← 0

    FUNCTION next(n):
        WHILE self.index < LENGTH(self.encoding):
            IF self.encoding[self.index] >= n:
                self.encoding[self.index] -= n
                RETURN self.encoding[self.index + 1]
            n -= self.encoding[self.index]
            self.index += 2
        RETURN -1
```

## Walkthrough

1. Start with `encoding = [3,8,0,9,2,5]`, `index = 0`.
2. `next(2)`: `encoding[0]=3 >=2` → decrement to `1`, return `8`.
3. `next(1)`: `encoding[0]=1 >=1` → decrement to `0`, return `8`.
4. `next(1)`: `encoding[0]=0 <1` → subtract `0`, move `index` to `2` (skip zero-count 9). Now `encoding[2]=2 >=1` → decrement to `1`, return `5`.
5. `next(2)`: `encoding[2]=1 <2` → subtract `1`, move `index` to `4` (end). No more runs, return `-1`.

## Complexity Analysis

- **Time:** O(k) per `next` call amortized, where k is number of runs consumed.
- **Space:** O(1) extra – modifies the encoding in place.

---

## Key Takeaway

> Maintain a pointer into the encoding; on each `next(n)`, consume runs until `n` is satisfied — classic "consume from a stream" iterator pattern.
