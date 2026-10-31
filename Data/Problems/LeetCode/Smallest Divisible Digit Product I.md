# 3345. Smallest Divisible Digit Product I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-divisible-digit-product-i](https://leetcode.com/problems/smallest-divisible-digit-product-i)
**Companies:** Accenture

---

## Problem Description
You are given two integers `n` and `t`. Return the **smallest** number greater than or equal to `n` such that the **product of its digits** is divisible by `t`.

**Constraints:**
- `1 <= n <= 100`
- `1 <= t <= 10`

## Examples
```
Example 1:
  Input: n = 10, t = 2
  Output: 10
  Explanation: The digit product of 10 is 0, which is divisible by 2, making it the smallest number greater than or equal to 10 that satisfies the condition.
```

```
Example 2:
  Input: n = 15, t = 3
  Output: 16
  Explanation: The digit product of 16 is 6, which is divisible by 3, making it the smallest number greater than or equal to 15 that satisfies the condition.
```

## Approach
**Algorithm:** Greedy construction using prime factorization of `n`.

1. Factor `n` into primes (only 2,3,5,7 are relevant because digit values are ≤9).
2. For each prime factor, map it to a digit that contributes the same prime power (e.g., `2→2`, `3→3`, `4→2·2`, `5→5`, `6→2·3`, `7→7`, `8→2·2·2`, `9→3·3`).
3. Combine digits to cover all prime powers with the smallest possible numeric value by sorting digits in ascending order.
4. If after using digits the product still lacks some factor, multiply by `9` (adds two 3s) or `8` (adds three 2s) as needed.
5. Return the concatenated sorted digits as the answer string.

**Pseudocode:**
```text
FUNCTION smallestDivisibleDigitProduct(n):
    // Count required prime factors
    need2 ← 0; need3 ← 0; need5 ← 0; need7 ← 0
    temp ← n
    WHILE temp MOD 2 = 0: need2 ← need2 + 1; temp ← temp / 2
    WHILE temp MOD 3 = 0: need3 ← need3 + 1; temp ← temp / 3
    WHILE temp MOD 5 = 0: need5 ← need5 + 1; temp ← temp / 5
    WHILE temp MOD 7 = 0: need7 ← need7 + 1; temp ← temp / 7
    // Remaining factor >7 cannot be formed by digits → use 9s and 8s later
    digits ← empty list
    // Use digits that directly supply needed primes
    WHILE need7 > 0: APPEND(digits, 7); need7 ← need7 - 1
    WHILE need5 > 0: APPEND(digits, 5); need5 ← need5 - 1
    // Combine 2s and 3s into larger digits to minimize count
    WHILE need2 >= 3: APPEND(digits, 8); need2 ← need2 - 3
    WHILE need3 >= 2: APPEND(digits, 9); need3 ← need3 - 2
    // Pair remaining 2 and 3 into 6
    WHILE need2 > 0 AND need3 > 0:
        APPEND(digits, 6); need2 ← need2 - 1; need3 ← need3 - 1
    // Remaining 2s become 2, remaining 3s become 3
    WHILE need2 > 0: APPEND(digits, 2); need2 ← need2 - 1
    WHILE need3 > 0: APPEND(digits, 3); need3 ← need3 - 1
    // If temp > 1 (prime >7) cannot be covered, multiply by 9 repeatedly until product divisible
    WHILE temp > 1:
        APPEND(digits, 9)
        temp ← temp / 9   // approximate handling
    SORT(digits) // ascending to get smallest number
    RETURN CONCATENATE all digits as string
```

## Walkthrough
For `n = 10`:
1. Factor: `2^1 * 5^1` → need2=1, need5=1.
2. Append digit `5` (covers need5) and digit `2` (covers need2).
3. Digits list `[2,5]`, sorted already.
4. Result string `"25"` whose digit product `2*5 = 10`.

## Complexity Analysis
- **Time:** O(log n) for factorization + O(number of digits) for construction → effectively O(log n).
- **Space:** O(number of digits) for the digit list → O(log n) in the worst case.

## Follow-Up Questions
1. How would the solution change if digits could be repeated unlimitedly but the answer must have the minimal *length* rather than minimal numeric value?
2. Can the algorithm be extended to handle bases other than decimal?
3. What is the approach when `n` contains prime factors larger than 7?

## Key Takeaway
By breaking `n` into prime factors and greedily mapping them to digits that embed those factors, we can construct the smallest integer whose digit product is divisible by `n`.
