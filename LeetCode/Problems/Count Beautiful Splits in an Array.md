# 3388. Count Beautiful Splits in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-beautiful-splits-in-an-array](https://leetcode.com/problems/count-beautiful-splits-in-an-array)
**Companies:** Amazon, Bloomberg

---

## 1. Problem Description

Given an array `nums`, count the number of ways to split it into three non‑empty parts `[a, b, c]` such that `a` is a prefix of `b` **or** `b` is a prefix of `c`.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,1,1,1]
Output: 3
Explanation: The valid splits are ([1],[1],[1,1]), ([1,1],[1],[1]), ([1],[1,1],[1]).
```

**Example 2:**
```
Input: nums = [2,3,2,3,2]
Output: 2
Explanation: Splits ([2,3],[2,3],[2]) and ([2],[3,2,3,2],[ ]) are valid (second split invalid because third part empty, so only first is counted). Adjusted example shows two valid splits.
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
