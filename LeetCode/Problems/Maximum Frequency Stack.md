# 895. Maximum Frequency Stack

**Difficulty:** 🔴 Hard
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-stack](https://leetcode.com/problems/maximum-frequency-stack)
**Companies:** Amazon, Apple, Bloomberg, Expedia, Flipkart, Glovo, Google, Meta, Microsoft, Nutanix, Salesforce, Uber

---

## 1. Problem Description

Design a stack-like data structure. `push(val)` pushes a value. `pop()` removes and returns the most frequent element. If tie, return the one closest to the top.

---

## 2. Approach: Frequency Map + Stack per Frequency — O(1) ✅

```
CLASS FreqStack:
    CONSTRUCTOR:
        freq = {}           // val → frequency
        freqToStack = {}    // frequency → stack of values
        maxFreq = 0

    FUNCTION push(val):
        freq[val] = freq.get(val, 0) + 1
        f = freq[val]
        maxFreq = MAX(maxFreq, f)

        IF f NOT IN freqToStack:
            freqToStack[f] = []
        freqToStack[f].PUSH(val)

    FUNCTION pop():
        val = freqToStack[maxFreq].POP()
        freq[val] -= 1

        IF freqToStack[maxFreq] is empty:
            maxFreq -= 1

        RETURN val
```

### How It Works

Each value appears in multiple frequency stacks. A value with freq=3 is in stacks for freq 1, 2, and 3. Popping from `maxFreq` naturally handles the "most recent among most frequent" tie-breaking.

| Operation | Time |
|-----------|------|
| push | O(1) |
| pop | O(1) |

---

## Key Takeaway

> Group values by frequency using a stack per frequency level. `maxFreq` tracks the current highest. Both operations are O(1) with this elegant design.
