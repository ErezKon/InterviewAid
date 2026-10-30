# 3490. Count Beautiful Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-beautiful-numbers](https://leetcode.com/problems/count-beautiful-numbers)
**Companies:** Google

---

## 1. Problem Description

You are given two positive integers, `l` and `r`. A positive integer is called **beautiful** if the product of its digits is divisible by the sum of its digits.

Return the count of **beautiful** numbers between `l` and `r`, inclusive.

**Constraints:**
- `1 <= l <= r < 10^9`

---

## 2. Key Insight

> Use **digit DP** with state `(position, tight, sum_of_digits, product_of_digits)`. At the end, check if `product % sum == 0`. The product can be large but is bounded by `9^d`.

---

## 3. Approach: Digit DP — O(d × S × P) ✅

```text
FUNCTION countBeautiful(l, r):
    RETURN digitDP(r) - digitDP(l - 1)
    
FUNCTION digitDP(num):
    digits = str(num)
    // dp[pos][tight][sum][product]
    // sum ≤ 9×d, product can be factored into primes {2,3,5,7}
    
    FUNCTION solve(pos, tight, digitSum, digitProduct, started):
        IF pos == len(digits):
            IF NOT started: RETURN 0
            RETURN 1 IF digitProduct % digitSum == 0 ELSE 0
        
        limit = digits[pos] IF tight ELSE 9
        count = 0
        FOR d FROM 0 TO limit:
            newTight = tight AND (d == limit)
            IF NOT started AND d == 0:
                count += solve(pos+1, newTight, 0, 0, false)
            ELSE:
                count += solve(pos+1, newTight, digitSum+d, 
                              digitProduct*d IF started ELSE d, true)
        RETURN count
    
    RETURN solve(0, true, 0, 0, false)
```

| Time | Space |
|------|-------|
| O(d × 9d × product_states) | O(same) |

---

## 4. Examples

```
Example 1:
  Input: l = 10, r = 20
  Output: 2
  Explanation: The beautiful numbers in the range are 10 and 20.
```

```
Example 2:
  Input: l = 1, r = 15
  Output: 10
  Explanation: The beautiful numbers in the range are 1, 2, 3, 4, 5, 6, 7, 8, 9, and 10.
```

---

## 5. Walkthrough

Consider `num = 23`.
| Position | Digit | Tight | Started | Sum | Product | Decision |
|----------|-------|-------|---------|-----|---------|----------|
| 0        | 2     | true  | true    | 2   | 2       | continue |
| 1        | 3     | true  | true    | 5   | 6       | end, 6%5≠0 → not beautiful |

The DP explores all digit choices respecting the tight constraint, accumulating sum and product, and checks divisibility at the leaf.

---

## 6. Complexity Analysis

- **Time:** O(d × S × P) where `d` is number of digits, `S` is possible sum range (≤9d), and `P` is distinct product states (compressed via prime factorization).
- **Space:** Same as time due to memoization table.

---

## Key Takeaway

> Digit DP tracking sum and product of digits. The divisibility check `product % sum == 0` is evaluated at the leaf. Product states can be compressed via prime factorization.
