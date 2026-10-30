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

Given a string `s` represents the serialization of a nested list, implement a parser to deserialize it and return *the deserialized* `NestedInteger`.

Each element is either an integer or a list whose elements may also be integers or other lists.

**Constraints:**
- `1 ≤ s.length ≤ 5 × 10⁴`
- `s` consists of digits, square brackets `"[]"`, negative sign `'-'`, and commas `','`.
- `s` is the serialization of valid `NestedInteger`.
- All the values in the input are in the range `[-10⁶, 10⁶]`.

---

## Examples

```
Example 1:
  Input: s = "324"
  Output: 324
  Explanation: You should return a NestedInteger object which contains a single integer 324.
```

```
Example 2:
  Input: s = "[123,[456,[789]]]"
  Output: [123,[456,[789]]]
  Explanation: Return a NestedInteger object containing a nested list with 2 elements:
  1. An integer containing value 123.
  2. A nested list containing two elements:
      i.  An integer containing value 456.
      ii. A nested list with one element:
           a. An integer containing value 789
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
