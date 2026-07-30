# 3307. Find the K-th Character in String Game II

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Bloomberg, Google
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Recursive Binary Lifting — O(log k) ✅](#3-approach-recursive-binary-lifting--olog-k-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Same as Game I but with much larger `k` (up to 10¹⁴) and custom operations per step. Each step either appends the string with each character incremented by 1, or appends the string unchanged. Find the k-th character without constructing the string.

**Constraints:**
- `1 <= k <= 10¹⁴`
- `1 <= operations.length <= 100`

---

## 2. Key Insight

> Work backwards from position `k`. At each step, the string doubles. If `k` is in the second half, determine which position in the first half it maps to, and whether it's shifted. Recurse until `k = 1` (which is always 'a'). The total shift mod 26 gives the answer.

---

## 3. Approach: Recursive Binary Lifting — O(log k) ✅

```text
FUNCTION kthCharacter(k, operations):
    // Find how many doubling steps are needed
    n ← LENGTH(operations)
    shift ← 0

    FOR step ← n - 1 DOWNTO 0 DO
        halfLen ← 2^step
        IF k > halfLen THEN
            // k is in the second half → map to first half
            k ← k - halfLen
            IF operations[step] == 1 THEN
                shift ← (shift + 1) MOD 26

    RETURN chr(ord('a') + shift)
```

---

## 4. Walkthrough

```text
k = 5, operations = [1, 1, 1]

step=2: halfLen=4, k=5>4 → k=1, shift=1 (op=1)
step=1: halfLen=2, k=1≤2 → stay
step=0: halfLen=1, k=1≤1 → stay

Answer: chr('a' + 1) = 'b' ✅
```

---

## 5. Examples

```text
Input: k = 10, operations = [0,1,0]
Output: 'c'
Explanation: After processing the operations, the 10th character maps back to the first character with a total shift of 2.
```

```text
Input: k = 1, operations = []
Output: 'a'
Explanation: The first character is always 'a' regardless of operations.
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) where n = number of operations |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you modify the solution if the shift operation could increase characters by more than one?
- Can the approach be extended to support deletions or insertions in the string?
- What if `k` could be as large as 10¹⁸?

---

## 8. Key Takeaway

> **Binary lifting** traces position `k` back through doubling steps without building the string. Each step either maps `k` to the first half (with an optional +1 shift) or stays. This handles k up to 10¹⁴ efficiently.
