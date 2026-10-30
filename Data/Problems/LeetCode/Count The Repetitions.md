# 466. Count The Repetitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-repetitions](https://leetcode.com/problems/count-the-repetitions)
**Companies:** Google

---

## Problem Description

We define `str = [s, n]` as the string `str` which consists of the string `s` concatenated `n` times.

- For example, `str == ["abc", 3] == "abcabcabc"`.

We define that string `s1` can be obtained from string `s2` if we can remove some characters from `s2` such that it becomes `s1`.

- For example, `s1 = "abc"` can be obtained from `s2 = "abdbec"` based on our definition by removing the characters `'d'` and `'e'`.

You are given two strings `s1` and `s2` and two integers `n1` and `n2`. You have the two strings `str1 = [s1, n1]` and `str2 = [s2, n2]`.

Return *the maximum integer* `m` *such that* `str = [str2, m]` *can be obtained from* `str1`.

**Constraints:**
- `1 <= s1.length, s2.length <= 100`
- `s1` and `s2` consist of lowercase English letters.
- `1 <= n1, n2 <= 10^6`

---

## Examples

```
Example 1:
  Input: s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
  Output: 2
  Explanation: str1 = "acbacbacbacb" and str2 = "abab". [str2, 2] = "abababab" can be obtained from str1, but [str2, 3] cannot.
```

```
Example 2:
  Input: s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
  Output: 1
```

---

## Key Insight

Simulate matching `s2` as a subsequence within repeated copies of `s1`. After processing each copy of `s1`, track the position within `s2`. Once the position **cycles** (same position in `s2` after a complete `s1` copy), use the cycle to extrapolate without further simulation.

---

## Approach

```text
FUNCTION getMaxRepetitions(s1, n1, s2, n2):
    // recall maps position in s2 → (index of s1 copy, total full s2 matches so far)
    recall ← MAP()
    s2Count ← 0
    s2Idx ← 0
    FOR i ← 0 TO n1 - 1:
        FOR c IN s1:
            IF c = s2[s2Idx]:
                s2Idx ← s2Idx + 1
                IF s2Idx = LENGTH(s2):
                    s2Count ← s2Count + 1
                    s2Idx ← 0
        IF s2Idx IN recall:
            prevI, prevCount ← recall[s2Idx]
            cycleLen ← i - prevI
            cycleCount ← s2Count - prevCount
            remaining ← n1 - 1 - i
            fullCycles ← remaining // cycleLen
            s2Count ← s2Count + fullCycles * cycleCount
            // simulate leftover copies
            leftover ← remaining % cycleLen
            FOR j ← 0 TO leftover - 1:
                FOR c IN s1:
                    IF c = s2[s2Idx]:
                        s2Idx ← s2Idx + 1
                        IF s2Idx = LENGTH(s2):
                            s2Count ← s2Count + 1
                            s2Idx ← 0
            RETURN s2Count // n2
        recall[s2Idx] ← (i, s2Count)
    RETURN s2Count // n2
```

---

## Walkthrough

Take `s1 = "acb"`, `n1 = 4`, `s2 = "ab"`, `n2 = 2`.
1. **First copy of s1** (`i=0`):
   - `c='a'` matches `s2[0]` → `s2Idx=1`.
   - `c='c'` no match.
   - `c='b'` matches `s2[1]` → full `s2` found, `s2Count=1`, `s2Idx=0`.
   Record `recall[0] = (0,1)`.
2. **Second copy** (`i=1`):
   - Process similarly, another full `s2` found → `s2Count=2`, `s2Idx=0`.
   Cycle detected: `s2Idx=0` seen before at `i=0`.
   - `cycleLen = 1`, `cycleCount = 1`.
   - Remaining copies = `4-1-1 = 2`.
   - `fullCycles = 2 // 1 = 2` → add `2 * 1` to `s2Count` → `s2Count=4`.
   - No leftover copies.
   Final answer `s2Count // n2 = 4 // 2 = 2`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(LEN(s1) × LEN(s2)) in the worst case before a cycle is found; after detection, O(LEN(s1) × cycleLen) which is bounded by LEN(s2). |
| **Space** | O(LEN(s2)) for the `recall` map. |

---

## Follow-Up Questions

1. How would the algorithm change if `s2` could contain characters not present in `s1`?
2. Can the approach be extended to count overlapping subsequences?
3. What is the impact on complexity if `n1` and `n2` are extremely large (e.g., 10^9)?

---

## Key Takeaway

> **Detecting cycles in the position of `s2` after each full pass of `s1` lets us skip huge repetitions, turning a potentially O(n1·|s1|) simulation into O(|s1|·|s2|).**