# 402. Remove K Digits

**Difficulty:** 🟡 Medium
**Acceptance:** 33.0%
**LeetCode:** [https://leetcode.com/problems/remove-k-digits](https://leetcode.com/problems/remove-k-digits)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Bytedance, Coupang, Deloitte, Google, Huawei, Josh Technology, Meta, Microsoft, Oracle, Park, Phonepe, Samsung, Snapchat, Snowflake, Tiktok, Walmart Labs, Zeta, Zoho, Zopsmart

---

## 1. Problem Description

Given string `num` and integer `k`, remove `k` digits to make the smallest possible number.

---

## 2. Approach: Monotonic Stack — O(n) ✅

```text
FUNCTION removeKdigits(num, k):
    stack ← []
    FOR digit IN num:
        WHILE k > 0 AND stack NOT EMPTY AND stack.TOP() > digit:
            stack.POP()
            k ← k - 1
        stack.PUSH(digit)
    WHILE k > 0:
        stack.POP()
        k ← k - 1
    result ← JOIN(stack)
    result ← result.LSTRIP('0')
    RETURN result IF result != "" ELSE "0"
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"1432219"`, `k = 3` | `"1219"` | Remove digits `4`, `3`, and `2` to get the smallest number. |
| `"10200"`, `k = 1` | `"200"` | Remove leading `1` and strip leading zeros. |
| `"10"`, `k = 2` | `"0"` | All digits removed, result is `0`. |

---

## 4. Walkthrough

**Example:** `num = "1432219"`, `k = 3`

| Step | Stack (top → bottom) | Remaining k | Action |
|------|----------------------|------------|--------|
| 1 | [] | 3 | Push `1` |
| 2 | [1] | 3 | `4` > `1` → push `4` |
| 3 | [1,4] | 3 | `3` < `4` → pop `4`, k=2; push `3` |
| 4 | [1,3] | 2 | `2` < `3` → pop `3`, k=1; push `2` |
| 5 | [1,2] | 1 | `2` ≥ `2` → push `2` |
| 6 | [1,2,2] | 1 | `1` < `2` → pop `2`, k=0; push `1` |
| 7 | [1,2,1] | 0 | Push remaining digits `9` |
| Final Stack | [1,2,1,9] | 0 | Join → `"1219"` |

---

## 5. Complexity Analysis

- **Time:** O(n) – each digit is processed at most twice (push and possible pop).
- **Space:** O(n) – stack stores at most all digits.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the largest possible number after removing `k` digits?
- Can you solve the problem in-place without using extra stack space?
- How would the solution change if the input were a linked list of digits?

---

## Key Takeaway

> Greedy + monotonic stack: remove digits that are larger than the next digit (greedy choice for smallest result). Process left to right, maintaining an increasing stack.
