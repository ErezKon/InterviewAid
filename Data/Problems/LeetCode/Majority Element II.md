# 229. Majority Element II

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/majority-element-ii](https://leetcode.com/problems/majority-element-ii)
**Companies:** Amazon, Atlassian, Bloomberg, Darwinbox, Google, Intel, Meta, Microsoft, Tcs, Zenefits

---

## 1. Problem Description

Given an integer array, find all elements appearing more than ⌊n/3⌋ times. Must run in O(n) time and O(1) space.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,2,3]` | `[3]` | `3` appears 2 times > 3/3.
| `[1,1,1,3,3,2,2,2]` | `[1,2]` | Both `1` and `2` appear 3 times > 8/3.
| `[1,2,3,4]` | `[]` | No element appears more than ⌊4/3⌋ = 1 time.

---

## 3. Approach: Extended Boyer-Moore Voting — O(n) ✅

```text
FUNCTION majorityElementII(nums):
    // Phase 1: find up to two candidates
    SET cand1 ← null, cand2 ← null
    SET count1 ← 0, count2 ← 0
    FOR num IN nums:
        IF num == cand1:
            SET count1 ← count1 + 1
        ELSE IF num == cand2:
            SET count2 ← count2 + 1
        ELSE IF count1 == 0:
            SET cand1 ← num
            SET count1 ← 1
        ELSE IF count2 == 0:
            SET cand2 ← num
            SET count2 ← 1
        ELSE:
            SET count1 ← count1 - 1
            SET count2 ← count2 - 1
    // Phase 2: verify the candidates
    SET result ← []
    FOR cand IN [cand1, cand2]:
        IF cand IS NOT null AND COUNT(cand in nums) > LENGTH(nums) / 3:
            APPEND cand TO result
    RETURN result
```

---

## 4. Walkthrough

Consider `nums = [1,1,1,3,3,2,2,2]`:

1. **Iterate** maintaining two candidates.
2. After processing, `cand1 = 1` with `count1 = 1`, `cand2 = 2` with `count2 = 1`.
3. **Verification** counts: `1` appears 3 times (>8/3), `2` appears 3 times (>8/3). Both are added to result.

---

## 5. Complexity Analysis

- **Time:** O(n) – two linear passes.
- **Space:** O(1) – only a few variables regardless of input size.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm to find elements appearing more than ⌊n/k⌋ times for arbitrary `k`?
- Can the solution be extended to return the counts of the majority elements as well?

---

## 7. Key Takeaway

> Extended Boyer-Moore: track k‑1 candidates for > n/k threshold. Always verify in a second pass since the algorithm only guarantees candidates, not certainty.
