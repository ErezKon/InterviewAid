# 3388. Count Beautiful Splits in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-beautiful-splits-in-an-array](https://leetcode.com/problems/count-beautiful-splits-in-an-array)
**Companies:** Amazon, Bloomberg

---

## 1. Problem Description

You are given an array `nums`.

A split of an array `nums` is **beautiful** if:

- The array `nums` is split into three subarrays: `nums1`, `nums2`, and `nums3`, such that `nums` can be formed by concatenating `nums1`, `nums2`, and `nums3` in that order.
- The subarray `nums1` is a prefix of `nums2` **OR** `nums2` is a prefix of `nums3`.

Return the **number of ways** you can make this split.

**Constraints:**
- `1 <= nums.length <= 5000`
- `0 <= nums[i] <= 50`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,1,2,1]
Output: 2
Explanation: The beautiful splits are:
- A split with nums1 = [1], nums2 = [1,2], nums3 = [1].
- A split with nums1 = [1], nums2 = [1], nums3 = [2,1].
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 0
Explanation: There are 0 beautiful splits.
```

---

## 3. Key Insight

> Use the **Z‑function** or **LCP array** to efficiently check prefix relationships. `a` is a prefix of `b` iff the longest common prefix of the suffixes starting at the beginnings of `a` and `b` is at least `|a|`. Pre‑computing all LCP values lets each split be verified in O(1).

---

## 4. Approach: LCP Table — O(n²) ✅

```text
FUNCTION beautifulSplits(nums):
    n ← LENGTH(nums)
    // lcp[i][j] = length of longest common prefix of nums[i:] and nums[j:]
    DECLARE lcp[n][n] ← 0
    FOR i FROM n-1 DOWNTO 0:
        FOR j FROM n-1 DOWNTO 0:
            IF nums[i] == nums[j]:
                IF i+1 < n AND j+1 < n:
                    lcp[i][j] ← lcp[i+1][j+1] + 1
                ELSE:
                    lcp[i][j] ← 1
            ELSE:
                lcp[i][j] ← 0
    
    count ← 0
    FOR i FROM 1 TO n-2:               // end index of part a (exclusive)
        FOR j FROM i+1 TO n-1:         // end index of part b (exclusive)
            lenA ← i
            lenB ← j - i
            // a is prefix of b ⇔ lcp[0][i] ≥ lenA
            // b is prefix of c ⇔ lcp[i][j] ≥ lenB
            IF lcp[0][i] ≥ lenA OR lcp[i][j] ≥ lenB:
                count ← count + 1
    RETURN count
```

---

## 5. Walkthrough

Consider `nums = [1,1,1,1]` (n = 4).
| i (end of a) | j (end of b) | lenA | lenB | lcp[0][i] | lcp[i][j] | Condition satisfied |
|--------------|--------------|------|------|-----------|-----------|----------------------|
| 1            | 2            | 1    | 1    | 3 ≥ 1     | 2 ≥ 1     | true (both) |
| 1            | 3            | 1    | 2    | 3 ≥ 1     | 1 ≥ 2 false| true (a prefix of b) |
| 2            | 3            | 2    | 1    | 2 ≥ 2     | 1 ≥ 1     | true |

The algorithm enumerates these pairs and counts the three valid splits.

---

## 6. Complexity Analysis

- **Time:** O(n²) to build the LCP table and O(n²) to enumerate split points → overall O(n²).
- **Space:** O(n²) for the LCP matrix.

---

## 7. Follow‑Up Questions

- How would you reduce the space complexity? (Hint: use Z‑function on the concatenated string.)
- Can the problem be solved in O(n) time using rolling hashes?
- How does the solution change if the prefix condition must hold for both `a`→`b` **and** `b`→`c` simultaneously?

---

## Key Takeaway

> Pre‑computing an LCP table lets you verify prefix relationships between any two suffixes in O(1), turning a combinatorial split‑counting problem into an O(n²) enumeration.
