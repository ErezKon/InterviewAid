# 845. Longest Mountain in Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-mountain-in-array](https://leetcode.com/problems/longest-mountain-in-array)
**Companies:** Amazon, Databricks, Faire, Google, Ibm, Meta, Microsoft, Oracle, Sofi, Tiktok

---

## 1. Problem Description

Find the longest mountain subarray (strictly increases then strictly decreases, length ≥ 3).

---

## 2. Approach: Two Pass — O(n) ✅

```
FUNCTION longestMountain(arr):
    n = len(arr)
    up = [0] * n
    down = [0] * n

    FOR i ← 1 TO n - 1:
        IF arr[i] > arr[i-1]: up[i] = up[i-1] + 1

    FOR i ← n - 2 DOWN TO 0:
        IF arr[i] > arr[i+1]: down[i] = down[i+1] + 1

    maxLen = 0
    FOR i ← 0 TO n - 1:
        IF up[i] > 0 AND down[i] > 0:
            maxLen = MAX(maxLen, up[i] + down[i] + 1)

    RETURN maxLen
```

---

## 3. Examples

**Example 1:**
```
Input: arr = [2,1,4,7,3,2,5]
Output: 5
Explanation: The longest mountain is [1,4,7,3,2].
```

**Example 2:**
```
Input: arr = [2,2,2]
Output: 0
Explanation: No mountain exists because there is no strict increase then decrease.
```

---

## 4. Walkthrough

Consider Example 1. The first pass computes `up` lengths: `[0,0,1,2,0,0,1]`. The second pass computes `down` lengths: `[0,0,2,1,1,0,0]`. At index 3 (value 7), `up[3]=2` and `down[3]=1`, giving mountain length `2+1+1=4`. At index 2, `up[2]=1` and `down[2]=2` → length `1+2+1=4`. The maximum occurs at index 3 with length 5 (including the peak itself).

---

## 5. Complexity Analysis

- **Time:** O(n) – two linear passes.
- **Space:** O(n) for the `up` and `down` arrays (can be reduced to O(1) with a single‑pass two‑pointer method).

---

## 6. Follow‑Up Questions

- How would you solve the problem using O(1) extra space?
- Can you extend the solution to handle multiple peaks and return all longest mountains?
- What changes are needed if the mountain length must be at least `k`?

---

## 7. Key Takeaway

> Precompute increasing and decreasing run lengths. A peak with both runs >0 forms a mountain; combine lengths to get total size.
