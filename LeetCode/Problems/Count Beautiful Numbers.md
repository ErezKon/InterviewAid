# 3490. Count Beautiful Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-beautiful-numbers](https://leetcode.com/problems/count-beautiful-numbers)
**Companies:** Google

---

## 1. Problem Description

Count numbers in `[l, r]` where the product of digits is divisible by the sum of digits. These are "beautiful numbers."

---

## 2. Key Insight

> Use **digit DP** with state `(position, tight, sum_of_digits, product_of_digits)`. At the end, check if `product % sum == 0`. The product can be large but is bounded by `9^d`.

---

## 3. Approach: Digit DP — O(d × S × P) ✅

```
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

## Key Takeaway

> Digit DP tracking sum and product of digits. The divisibility check `product % sum == 0` is evaluated at the leaf. Product states can be compressed via prime factorization.
