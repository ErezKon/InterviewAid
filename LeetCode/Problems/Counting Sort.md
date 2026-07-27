# Counting Sort Pattern

Used by multiple LeetCode problems including Sort Colors (#75), Sort an Array (#912), and H-Index (#274).

---

## Template

When the value range is bounded (e.g., 0 to k), counting sort provides O(n + k) time.

```
FUNCTION countingSort(nums, maxVal):
    count = array of (maxVal + 1) zeros
    FOR num IN nums:
        count[num] += 1

    idx = 0
    FOR val ← 0 TO maxVal:
        WHILE count[val] > 0:
            nums[idx] = val
            idx += 1
            count[val] -= 1
```

---

## Key Takeaway

> When the range of values is small relative to the array size, counting sort beats comparison-based sorts. O(n + k) vs O(n log n).
