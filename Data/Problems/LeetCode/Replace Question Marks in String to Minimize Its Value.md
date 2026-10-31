# 3081. Replace Question Marks in String to Minimize Its Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value](https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value)
**Companies:** Amazon

---

## Problem Description

You are given a string `s`. `s[i]` is either a lowercase English letter or `'?'`.

For a string `t` having length `m` containing **only** lowercase English letters, we define the function `cost(i)` for an index `i` as the number of characters **equal** to `t[i]` that appeared before it, i.e. in the range `[0, i - 1]`.

The **value** of `t` is the **sum** of `cost(i)` for all indices `i`.

For example, for the string `t = "aab"`:

- `cost(0) = 0`
- `cost(1) = 1`
- `cost(2) = 0`
- Hence, the value of `"aab"` is `0 + 1 + 0 = 1`.

Your task is to **replace all** occurrences of `'?'` in `s` with any lowercase English letter so that the **value** of `s` is **minimized**.

Return *a string denoting the modified string with replaced occurrences of* `'?'`*. If there are multiple strings resulting in the **minimum value**, return the lexicographically smallest one.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either a lowercase English letter or `'?'`.

## Examples

**Example 1:**
```
Input: s = "???"
Output: "abc"
Explanation: In this example, we can replace the occurrences of '?' to make s equal to "abc".
For "abc", cost(0) = 0, cost(1) = 0, and cost(2) = 0.
The value of "abc" is 0.
Some other modifications of s that have a value of 0 are "cba", "abz", and, "hey".
Among all of them, we choose the lexicographically smallest.
```

**Example 2:**
```
Input: s = "a?a?"
Output: "abac"
Explanation: In this example, the occurrences of '?' can be replaced to make s equal to "abac".
For "abac", cost(0) = 0, cost(1) = 0, cost(2) = 1, and cost(3) = 0.
The value of "abac" is 1.
```

## Approach
If letter `c` occurs `k` times in the final string, those occurrences contribute `0 + 1 + ... + (k-1) = k(k-1)/2` to the value, regardless of where they are. So the value depends **only on the letter counts**, not on positions.

1. **Choose the multiset of letters.** Count the fixed letters. For each `'?'`, greedily pick the letter with the smallest current count (ties broken by the smaller letter) and increment its count. Adding a letter with count `k` raises the value by `k`, so always taking the minimum count is optimal. A min-heap of `(count, letter)` does this in O(log 26).
2. **Make it lexicographically smallest.** The positions of the chosen letters do not affect the value, so sort the chosen letters and write them into the `'?'` positions from left to right.

```text
FUNCTION minimizeStringValue(s):
    cnt ← array of 26 zeros
    FOR each c IN s:
        IF c ≠ '?': cnt[c] ← cnt[c] + 1
    heap ← MIN-HEAP of (cnt[c], c) FOR c ← 'a' TO 'z'
    chosen ← []
    FOR each c IN s:
        IF c = '?':
            (k, letter) ← POP-MIN(heap)
            APPEND letter TO chosen
            PUSH (k + 1, letter) INTO heap
    SORT chosen ASCENDING
    result ← CHARACTER ARRAY OF s
    j ← 0
    FOR i ← 0 TO length(s)-1:
        IF result[i] = '?':
            result[i] ← chosen[j]
            j ← j + 1
    RETURN JOIN(result)
```

## Walkthrough
Example 2: `s = "a?a?"`. Fixed counts: `a = 2`, all others 0.

| Step | '?' # | Heap minimum (count, letter) | Chosen | Counts after |
|------|-------|------------------------------|--------|--------------|
| 1 | first '?' | (0, b) | b | a=2, b=1 |
| 2 | second '?' | (0, c) | c | a=2, b=1, c=1 |

Sorted chosen letters: `[b, c]`. Fill positions 1 and 3: `"a" + "b" + "a" + "c"` = `"abac"` (value = 1, from the second `a`). Result: `"abac"` — matches the expected output.

## Complexity Analysis
- **Time:** O(n log 26 + q log q) where q is the number of `'?'`; with a counting sort over 26 letters this is O(n).
- **Space:** O(26 + q) for the heap and the chosen letters, plus O(n) for the output string.

## Follow-Up Questions
1. Why is the greedy choice optimal? (Each added letter with current count `k` costs exactly `k`; the marginal costs of a letter are increasing, so picking the cheapest marginal cost each time minimises the convex sum.)
2. Could you avoid the heap? (Yes: with 26 letters a linear scan for the minimum per `'?'` is O(26·n), or "water-fill" counts level by level.)
3. What if `cost(i)` counted equal characters in a window of the last `w` positions instead of all earlier ones? (Positions now matter; the problem becomes a placement / spacing problem rather than a pure counting one.)

## Key Takeaway
The value is `Σ k_c(k_c − 1)/2`, a function of counts only: greedily assign each `'?'` the currently rarest letter, then sort those letters into the `'?'` slots to get the lexicographically smallest optimal string.
