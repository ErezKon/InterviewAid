# 3483. Unique 3-Digit Even Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-3-digit-even-numbers](https://leetcode.com/problems/unique-3-digit-even-numbers)
**Companies:** Amazon, Google

---

## Problem Description
Given an integer array `digits` containing digits from 0 to 9, return the number of **distinct** three‑digit even numbers that can be formed using **exactly three** digits from the array. Each digit from the array may be used at most once in each number. Leading zeros are not allowed.

## Examples
**Example 1**
```
Input: digits = [2,2,8,8,2]
Output: 2
Explanation: The possible even numbers are 228 and 282. 222 is not counted because it uses the digit 2 three times, which exceeds its frequency.
```
**Example 2**
```
Input: digits = [3,7,5]
Output: 0
Explanation: No even digit is available, so no even number can be formed.
```

## Approach
Enumerate all permutations of three distinct indices, build the number, check evenness and leading‑zero rule, and store it in a set to guarantee uniqueness.

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
For `digits = [2,2,8]`:
| i | j | k | num | valid? |
|---|---|---|-----|--------|
|0|1|2| 2*100+2*10+8 = 228 | yes |
|0|2|1| 2*100+8*10+2 = 282 | yes |
|1|0|2| 2*100+2*10+8 = 228 | duplicate (set) |
Result set = {228, 282} → count = 2.

## Complexity Analysis
- **Time:** O(n³) where n = length of `digits` (n ≤ 10).
- **Space:** O(k) for the set of unique numbers, k ≤ 120.

## Follow-Up Questions
1. How would you adapt the solution if the digits array could be very large (e.g., n up to 10⁵)?
2. Can you compute the count without enumerating all permutations by using combinatorial formulas?
3. How would you modify the algorithm to return the list of numbers sorted in ascending order?

## Key Takeaway
Enumerating all three‑digit permutations and deduplicating with a set yields a simple O(n³) solution that easily satisfies the small input constraints.
