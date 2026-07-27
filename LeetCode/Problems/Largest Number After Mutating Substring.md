# 1946. Largest Number After Mutating Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-number-after-mutating-substring](https://leetcode.com/problems/largest-number-after-mutating-substring)
**Companies:** Infosys

---

## 1. Problem Description

Given string `num` and array `change` (digit mapping), you may mutate at most one contiguous substring by replacing each digit `d` with `change[d]`. Maximize the number.

---

## 2. Approach: Greedy — O(n) ✅

```
FUNCTION maximumNumber(num, change):
    arr = list(num)
    started = false
    FOR i ← 0 TO len(arr)-1:
        d = int(arr[i])
        IF change[d] > d:
            arr[i] = str(change[d])
            started = true
        ELSE IF change[d] < d AND started:
            BREAK
    RETURN JOIN(arr)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Find the first digit where `change[d] > d`, start mutating. Continue as long as `change[d] >= d`. Stop at the first digit where mutation would decrease the value.
