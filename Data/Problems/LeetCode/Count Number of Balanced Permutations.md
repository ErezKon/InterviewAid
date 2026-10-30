# 3343. Count Number of Balanced Permutations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-balanced-permutations](https://leetcode.com/problems/count-number-of-balanced-permutations)
**Companies:** Google, Meta

---

## 1. Problem Description

You are given a string `num`. A string of digits is called **balanced** if the sum of the digits at even indices is equal to the sum of the digits at odd indices.

Return the number of **distinct** **permutations** of `num` that are **balanced**.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

A **permutation** is a rearrangement of all the characters of a string.

**Constraints:**
- `2 <= num.length <= 80`
- `num` consists of digits `'0'` to `'9'` only.

---

## 2. Key Insight

> Total digit sum must be even (otherwise 0). Each half (even/odd positions) must sum to `totalSum / 2`. Use DP to count ways to assign digits to even positions achieving the target sum, then multiply by multinomial arrangements.

---

## 3. Approach: DP on Digit Assignment — O(n × S × n/2) ✅

```text
FUNCTION countBalancedPermutations(num):
    // Convert string to list of digit values
    digits ← LIST_OF_INTEGERS(num)
    total ← SUM(digits)
    IF total MOD 2 ≠ 0:
        RETURN 0
    target ← total / 2
    n ← LENGTH(digits)
    evenSlots ← (n + 1) / 2   // number of even indices (0‑based)
    oddSlots ← n / 2
    
    // freq[d] = count of digit d in the input
    freq ← ARRAY[0..9] ← 0
    FOR d IN digits:
        freq[d] ← freq[d] + 1
    
    // dp[i][s] = number of ways to fill first i digit types achieving sum s in even slots
    dp ← MATRIX[0..10][0..target] ← 0
    dp[0][0] ← 1
    
    FOR digit FROM 0 TO 9:
        FOR used FROM 0 TO freq[digit]:
            // choose `used` copies of this digit to place in even positions
            // remaining copies go to odd positions automatically
            FOR sum FROM 0 TO target - used * digit:
                dp[digit+1][sum + used * digit] ← dp[digit+1][sum + used * digit] + dp[digit][sum] * COMBINATION(freq[digit], used)
    
    waysEven ← dp[10][target]
    // Multiply by arrangements within even and odd slots (multinomial coefficients)
    // totalWays = waysEven * (evenSlots! * oddSlots!) / PRODUCT_over_digits(freq[d]!)
    RETURN totalWays MOD 1_000_000_007
```

| Time | Space |
|------|-------|
| O(10 × target × evenSlots) | O(target × evenSlots) |

---

## Examples

```
Example 1:
  Input: num = "123"
  Output: 2
  Explanation:
  - The distinct permutations of num are "123", "132", "213", "231", "312" and "321".
  - Among them, "132" and "231" are balanced. Thus, the answer is 2.
```

```
Example 2:
  Input: num = "112"
  Output: 1
  Explanation:
  - The distinct permutations of num are "112", "121", and "211".
  - Only "121" is balanced. Thus, the answer is 1.
```

```
Example 3:
  Input: num = "12345"
  Output: 0
  Explanation:
  - None of the permutations of num are balanced, so the answer is 0.
```

(For example, "132" has even‑index sum = odd‑index sum = 3.)

---

## Walkthrough

Take `num = "123"` (digits [1,2,3]), total sum = 6, target = 3, evenSlots = 2.

1. Frequency: 1→1, 2→1, 3→1.
2. DP builds ways to pick digits for even positions summing to 3.
   - Choose {1,2} → sum 3 (1 way).
   - Choose {3,0} → sum 3 (1 way).
3. For each selection, remaining digits fill odd positions uniquely.
4. Multiply by arrangement counts → 2 valid permutations.

---

## Complexity Analysis

- **Time:** O(10 × target × evenSlots) – iterating over digit types, possible sums, and count choices.
- **Space:** O(target × evenSlots) – DP table.

---

## Follow-Up Questions

1. How would the solution change if the string length were up to 10^5? (Consider combinatorial formulas without DP.)
2. Can the problem be extended to balance sums across three groups (e.g., modulo 3 positions)?
3. What if digits could be repeated unlimited times – how would you count balanced sequences then?

---

## Key Takeaway

> Balance condition reduces to partitioning digits into two groups with equal sum. DP over digit frequencies counts valid partitions, then multinomial coefficients handle ordering.
