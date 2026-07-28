# 2780. Minimum Index of a Valid Split

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

An element is **dominant** if it appears more than half the time in a subarray. Given an integer array, find the smallest index `i` such that the dominant element of the whole array is also dominant in both the left subarray `nums[0..i]` and the right subarray `nums[i+1..n-1]`. Return `-1` if no such split exists.

## Approach: Boyer‑Moore Majority Vote + Prefix Scan — O(n) ✅

```text
FUNCTION findValidSplit(nums):
    // 1. Find candidate dominant element using Boyer‑Moore
    SET candidate ← None
    SET count ← 0
    FOR x IN nums:
        IF count = 0:
            SET candidate ← x; SET count ← 1
        ELSE IF x = candidate:
            SET count ← count + 1
        ELSE:
            SET count ← count - 1
    // 2. Verify candidate is truly dominant
    SET total ← 0
    FOR x IN nums:
        IF x = candidate: SET total ← total + 1
    IF total * 2 ≤ LENGTH(nums):
        RETURN -1  // no dominant element overall
    // 3. Scan to find earliest split where candidate stays dominant on both sides
    SET leftCount ← 0
    FOR i ← 0 TO LENGTH(nums) - 2:
        IF nums[i] = candidate: SET leftCount ← leftCount + 1
        SET leftSize ← i + 1
        SET rightSize ← LENGTH(nums) - leftSize
        IF leftCount * 2 > leftSize AND (total - leftCount) * 2 > rightSize:
            RETURN i
    RETURN -1
```

## Examples

**Example 1:**
```
Input: nums = [1,2,2,2,1,2,2]
Output: 3
Explanation: The dominant element is 2 (appears 5/7 times). Splitting after index 3 gives left = [1,2,2,2] (2 appears 3/4) and right = [1,2,2] (2 appears 2/3). Both halves have 2 as dominant, and 3 is the smallest such index.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: -1
Explanation: No element is dominant in the whole array, so no valid split exists.
```

## Walkthrough

1. **Find candidate** – Boyer‑Moore cancels out non‑dominant values, leaving 2 as candidate.
2. **Count total occurrences** – 2 appears 5 times, satisfying `5*2 > 7`.
3. **Prefix scan** – iterate indices:
   - i=0: leftCount=0 (1 is not 2) → left not dominant.
   - i=1: leftCount=1 → left 1/2 not dominant.
   - i=2: leftCount=2 → left 2/3 not dominant.
   - i=3: leftCount=3 → left 3/4 dominant, rightCount=2 → right 2/3 dominant → return 3.

## Complexity Analysis

- **Time:** O(n) – one pass for majority vote, one pass to count, one pass for prefix scan.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions

1. How would the solution change if there could be multiple dominant elements?
2. Can the algorithm be extended to find all valid split indices, not just the smallest?
3. What if the array is streamed and you cannot store it entirely in memory?

## Key Takeaway

> The overall dominant element must also dominate each half; using Boyer‑Moore to find the candidate and a single prefix scan yields an O(n) solution.
