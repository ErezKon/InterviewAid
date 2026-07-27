# 385. Mini Parser

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mini-parser](https://leetcode.com/problems/mini-parser)
**Companies:** Airbnb, Amazon, Bloomberg, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string representing a nested list (e.g., `"[123,[456,[789]]]"`), parse it into a `NestedInteger` structure. A NestedInteger is either a single integer or a list of NestedIntegers.

**Constraints:**
- `1 ≤ s.length ≤ 5 × 10⁴`
- `s` is a valid nested list representation

---

## Examples

**Example 1:**
```
Input:  "324"          → NestedInteger(324)
Input:  "[123,[456,[789]]]" → NestedInteger([123, [456, [789]]])
```

---

## Key Insight

> Use a **stack** — `[` pushes a new NestedInteger list, `]` pops and adds it to the parent. Numbers are accumulated character-by-character and added when a delimiter (`,` or `]`) is encountered.

---

## Approach: Stack — O(n) ✅

```
FUNCTION deserialize(s):
    IF s[0] ≠ '[' THEN RETURN NestedInteger(INT(s))
    stack ← []
    num ← ""

    FOR c IN s DO
        IF c = '[' THEN
            stack.PUSH(NestedInteger())
        ELSE IF c = ']' OR c = ',' THEN
            IF num ≠ "" THEN
                stack[-1].add(NestedInteger(INT(num)))
                num ← ""
            IF c = ']' AND LEN(stack) > 1 THEN
                top ← stack.POP()
                stack[-1].add(top)
        ELSE IF c = '-' THEN
            num ← num + '-'
        ELSE
            num ← num + c

    RETURN stack[0]
```

---

## Walkthrough

```
s = "[123,[456]]"

c='[': push NI(). stack=[NI[]]
c='1','2','3': num="123"
c=',': add 123 to stack[-1]. stack=[NI[123]]. num=""
c='[': push NI(). stack=[NI[123], NI[]]
c='4','5','6': num="456"
c=']': add 456 to stack[-1]. stack=[NI[123], NI[456]].
       Pop top, add to parent. stack=[NI[123, NI[456]]]
c=']': len=1, no pop. 

Return NI[123, [456]] ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack parsing | **O(n)** | **O(d)** where d = nesting depth |

---

## Follow-Up Questions

1. **Why check `s[0] != '['`?** A plain number has no nesting — parse it directly.
2. **How to handle negatives?** The `-` character is accumulated into `num` before digits.
3. **Recursive alternative?** Yes — parse recursively with an index pointer, but the stack approach is iterative and avoids stack overflow.

---

## Key Takeaway

> **Stack-based recursive descent parsing** — `[` pushes context, `]` pops and nests, delimiters flush accumulated numbers. A fundamental pattern for parsing nested structures.

---
