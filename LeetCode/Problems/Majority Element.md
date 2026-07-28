# 169. Majority Element

**Difficulty:** 🟢 Easy
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/majority-element](https://leetcode.com/problems/majority-element)
**Companies:** Accenture, Adobe, Amazon, Autodesk, Bloomberg, Cognizant, De Shaw, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Morgan Stanley, Netflix, Oracle, Pornhub, Qualcomm, Tcs, Yandex, Zenefits, Zoho

---

## 1. Problem Description

Given an array `nums`, return the majority element (appears more than ⌊n/2⌋ times). Guaranteed to exist.

---

## 2. Approach: Boyer-Moore Voting — O(n), O(1) ✅

```text
FUNCTION majorityElement(nums):
    candidate ← nums[0]
    count ← 1
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF count == 0:
            candidate ← nums[i]
            count ← 1
        ELSE IF nums[i] == candidate:
            count ← count + 1
        ELSE:
            count ← count - 1
    RETURN candidate
```

### Why It Works

The majority element appears > n/2 times. Pairing it with different elements can cancel at most n/2 of them, leaving the majority as the candidate.

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,2,3]` | `3` | `3` appears twice, which is > 3/2.
| `[2,2,1,1,1,2,2]` | `2` | `2` appears four times, > 7/2.

---

## 4. Walkthrough

Consider `[2,2,1,1,1,2,2]`:

| Index | Value | Candidate | Count |
|-------|-------|-----------|-------|
| 0 | 2 | 2 | 1 |
| 1 | 2 | 2 | 2 |
| 2 | 1 | 2 | 1 |
| 3 | 1 | 2 | 0 → reset |
| 4 | 1 | 1 | 1 |
| 5 | 2 | 1 | 0 → reset |
| 6 | 2 | 2 | 1 |

Final candidate `2` is the majority.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass.
- **Space:** O(1) – only two variables.

---

## Follow-Up: Majority Element II (#229)?

Find all elements appearing > n/3 times (at most 2 such elements). Extend Boyer-Moore to track two candidates.

---

## Key Takeaway

> Boyer-Moore Voting is the O(1) space solution for majority element. It's a beautiful algorithm: maintain a candidate with a count, increment on match, decrement on mismatch, reset when count hits 0.
