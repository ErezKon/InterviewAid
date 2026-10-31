# 3483. Unique 3-Digit Even Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-3-digit-even-numbers](https://leetcode.com/problems/unique-3-digit-even-numbers)
**Companies:** Amazon, Google

---

## Problem Description

You are given an array of digits called `digits`. Your task is to determine the number of **distinct** three-digit even numbers that can be formed using these digits.

**Note**: Each *copy* of a digit can only be used **once per number**, and there may **not** be leading zeros.

**Constraints:**
- `3 <= digits.length <= 10`
- `0 <= digits[i] <= 9`

## Examples

**Example 1:**
```
Input: digits = [1,2,3,4]
Output: 12
Explanation: The 12 distinct 3-digit even numbers that can be formed are 124, 132, 134, 142, 214, 234, 312, 314, 324, 342, 412, and 432. Note that 222 cannot be formed because there is only 1 copy of the digit 2.
```

**Example 2:**
```
Input: digits = [0,2,2]
Output: 2
Explanation: The only 3-digit even numbers that can be formed are 202 and 220. Note that the digit 2 can be used twice because it appears twice in the array.
```

**Example 3:**
```
Input: digits = [6,6,6]
Output: 1
Explanation: Only 666 can be formed.
```

**Example 4:**
```
Input: digits = [1,3,5]
Output: 0
Explanation: No even 3-digit numbers can be formed.
```

## Approach
Enumerate all permutations of three distinct indices, build the number, check evenness and leading-zero rule, and store it in a set to guarantee uniqueness.

```text
FUNCTION CountUniqueEvenNumbers(digits):
    SET uniqueNumbers ← EMPTY SET
    SET n ← LENGTH(digits)
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO n-1:
            IF j = i: CONTINUE
            FOR k ← 0 TO n-1:
                IF k = i OR k = j: CONTINUE
                SET num ← digits[i] * 100 + digits[j] * 10 + digits[k]
                IF num ≥ 100 AND (num MOD 2) = 0:
                    ADD num TO uniqueNumbers
    RETURN SIZE(uniqueNumbers)
```

## Walkthrough
Example 2: `digits = [0,2,2]` (all 6 ordered index triples):

| i | j | k | num | valid? |
|---|---|---|-----|--------|
|0|1|2| 0*100+2*10+2 = 22 | no (leading zero, < 100) |
|0|2|1| 22 | no (leading zero) |
|1|0|2| 2*100+0*10+2 = 202 | yes → add |
|1|2|0| 2*100+2*10+0 = 220 | yes → add |
|2|0|1| 202 | duplicate (set) |
|2|1|0| 220 | duplicate (set) |

Result set = {202, 220} → **Output: 2**. Example 1 (`[1,2,3,4]`) similarly yields the 12 listed numbers.

## Complexity Analysis
- **Time:** O(n³) where n = length of `digits` (n ≤ 10).
- **Space:** O(k) for the set of unique numbers, k ≤ 720 (at most n·(n-1)·(n-2) triples).

## Follow-Up Questions
1. How would you adapt the solution if the digits array could be very large (e.g., n up to 10⁵)?
2. Can you compute the count without enumerating all permutations by using combinatorial formulas?
3. How would you modify the algorithm to return the list of numbers sorted in ascending order?

## Key Takeaway
Enumerating all three-digit permutations and deduplicating with a set yields a simple O(n³) solution that easily satisfies the small input constraints.
