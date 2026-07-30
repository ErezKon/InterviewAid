# 717. 1-bit and 2-bit Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/1-bit-and-2-bit-characters](https://leetcode.com/problems/1-bit-and-2-bit-characters)
**Companies:** Bloomberg, Google, Ixl, Quora

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Scan — O(n) ✅](#4-approach-greedy-scan--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

We have two special characters:
- **1-bit character:** represented by `0`
- **2-bit character:** represented by `10` or `11`

Given a binary array `bits` that always ends with `0`, determine if the **last character** must be a 1-bit character.

**Constraints:**
- `1 ≤ bits.length ≤ 1000`
- `bits[i]` is `0` or `1`
- `bits[bits.length - 1] == 0`

---

## 2. Examples

```
Example 1:
  Input:  [1, 0, 0]
  Output: true
  Explanation: Decoding: [10, 0] → last char is "0" (1-bit) ✓

Example 2:
  Input:  [1, 1, 1, 0]
  Output: false
  Explanation: Decoding: [11, 10] → last char is "10" (2-bit), not 1-bit
```

Visual:
```
[1, 0, 0]  →  [1,0] [0]  →  2-bit, 1-bit  →  last is 1-bit ✓
[1, 1, 1, 0]  →  [1,1] [1,0]  →  2-bit, 2-bit  →  last is 2-bit ✗
```

---

## 3. Key Insight

> The decoding is **greedy and deterministic**: if the current bit is `1`, it always starts a 2-bit character (skip 2). If it's `0`, it's a 1-bit character (skip 1). Simply simulate and check if we land exactly on the last position.

---

## 4. Approach: Greedy Scan — O(n) ✅

```
FUNCTION isOneBitCharacter(bits):
    i = 0
    WHILE i < len(bits) - 1:
        i += 2 IF bits[i] == 1 ELSE 1
    RETURN i == len(bits) - 1
```

If `i` lands on the last index, it means that position is consumed as a 1-bit character. If `i` overshoots (skipped past it as part of a 2-bit char), it returns `false`.

---

## 5. Walkthrough

```
bits = [1, 1, 1, 0]

i=0: bits[0]=1 → 2-bit char → i += 2 → i=2
i=2: bits[2]=1 → 2-bit char → i += 2 → i=4
i=4: 4 >= len(bits)-1=3 → exit loop
Return i == 3? → 4 ≠ 3 → false ✅

bits = [1, 0, 0]

i=0: bits[0]=1 → 2-bit char → i += 2 → i=2
i=2: 2 >= len(bits)-1=2 → exit loop
Return i == 2? → 2 == 2 → true ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass through the array |
| **Space** | O(1) — only a pointer variable |

---

## 7. Follow-Up Questions

### 7.1 Can we solve it by counting trailing 1s?

Yes. Count consecutive `1`s immediately before the last `0`. If the count is **even**, the last `0` stands alone (1-bit). If **odd**, the last `0` is consumed by a 2-bit character.

```
FUNCTION isOneBitCharacterAlt(bits):
    count = 0
    FOR i ← len(bits) - 2 DOWN TO 0:
        IF bits[i] == 1: count += 1
        ELSE: BREAK
    RETURN count % 2 == 0
```

### 7.2 How is this related to variable-length encoding?

This is a simplified version of encodings like UTF-8, where the first bit(s) determine the character length. The greedy decoding principle is the same.

---

## 8. Key Takeaway

> Greedy left-to-right scan: `1` always starts a 2-bit character, `0` is always a 1-bit character. The decoding is deterministic — just simulate and check where you land.
