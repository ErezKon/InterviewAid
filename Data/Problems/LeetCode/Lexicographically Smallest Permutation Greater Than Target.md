# 3720. Lexicographically Smallest Permutation Greater Than Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target](https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given two strings `s` and `target`, both having length `n`, consisting of lowercase English letters.

Return the **lexicographically smallest permutation** of `s` that is **strictly** greater than `target`. If no permutation of `s` is lexicographically strictly greater than `target`, return an empty string.

A string `a` is **lexicographically strictly greater** than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears later in the alphabet than the corresponding letter in `b`.

**Constraints:**
- `1 <= s.length == target.length <= 300`
- `s` and `target` consist of only lowercase English letters.

---

## 2. Approach: Next Permutation Algorithm — O(n) ✅

```text
FUNCTION nextPermutation(nums):
    // 1. Find rightmost i where nums[i] < nums[i+1]
    i ← LENGTH(nums) - 2
    WHILE i ≥ 0 AND nums[i] ≥ nums[i+1]:
        i ← i - 1
    IF i ≥ 0:
        // 2. Find rightmost j > i where nums[j] > nums[i]
        j ← LENGTH(nums) - 1
        WHILE nums[j] ≤ nums[i]:
            j ← j - 1
        // 3. Swap nums[i] and nums[j]
        SWAP(nums[i], nums[j])
    // 4. Reverse suffix nums[i+1:]
    REVERSE(nums, i+1, LENGTH(nums)-1)
    RETURN nums
```

---

## 3. Examples

```
Example 1:
  Input: s = "abc", target = "bba"
  Output: "bca"
  Explanation:
  - The permutations of s (in lexicographical order) are "abc", "acb", "bac", "bca", "cab", and "cba".
  - The lexicographically smallest permutation that is strictly greater than target is "bca".
```

```
Example 2:
  Input: s = "leet", target = "code"
  Output: "eelt"
  Explanation:
  - The permutations of s (in lexicographical order) are "eelt", "eetl", "elet", "elte", "etel", "etle", "leet", "lete", "ltee", "teel", "tele", and "tlee".
  - The lexicographically smallest permutation that is strictly greater than target is "eelt".
```

```
Example 3:
  Input: s = "baba", target = "bbaa"
  Output: ""
  Explanation:
  - The permutations of s (in lexicographical order) are "aabb", "abab", "abba", "baab", "baba", and "bbaa".
  - None of them is lexicographically strictly greater than target. Therefore, the answer is "".
```

---

## 4. Walkthrough

Take `nums = [1,2,3]`.

1. Scan from right: `i = 1` because `2 < 3`.
2. Find `j = 2` where `nums[2] = 3 > nums[1] = 2`.
3. Swap → `[1,3,2]`.
4. Reverse suffix after index 1 (only element `2`) → unchanged.
Result `[1,3,2]`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

1. How would you generate the previous permutation?
2. Can you handle duplicate elements and still produce the next unique permutation?
3. What is the runtime if the array is stored in a linked list?

---

## Key Takeaway

> Classic next permutation: locate the rightmost ascent, swap with the smallest larger element to its right, then reverse the suffix to achieve the minimal greater ordering.
