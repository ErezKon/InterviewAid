# 636. Exclusive Time of Functions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/exclusive-time-of-functions](https://leetcode.com/problems/exclusive-time-of-functions)
**Companies:** Amazon, Anthropic, Apple, Axon, Bloomberg, Google, Ibm, Linkedin, Meta, Microsoft, Salesforce, Uber, Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Stack](#approach-stack--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` functions (0-indexed) and a list of logs `"id:start/end:timestamp"`, compute the **exclusive time** of each function. Functions can call other functions (nested), and only the innermost running function's time counts at any moment.

---

## Examples

```
Input: n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]
Output: [3,4]
Explanation: Function 0 runs [0,1] and [6,6] = 3 units.
  Function 1 runs [2,5] = 4 units.
```

---

## Key Insight

> Use a **stack** to track the currently running function. On `start`: charge elapsed time to the previous function (top of stack), push new function. On `end`: charge time to current function, pop it, update prevTime to `time + 1` (next unit starts after end).

---

## Approach: Stack — O(n) ✅

```
FUNCTION exclusiveTime(n, logs):
    result = [0] * n
    stack = []
    prevTime = 0

    FOR log IN logs:
        [id, type, time] = parse(log)

        IF type == "start":
            IF stack:
                result[stack.TOP()] += time - prevTime
            stack.PUSH(id)
            prevTime = time
        ELSE:
            result[stack.POP()] += time - prevTime + 1
            prevTime = time + 1

    RETURN result
```

---

## Walkthrough

```
logs = ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]

"0:start:0": stack=[], push 0, prevTime=0. stack=[0]
"1:start:2": stack=[0], result[0] += 2-0=2, push 1, prevTime=2. stack=[0,1]
"1:end:5":   pop 1, result[1] += 5-2+1=4, prevTime=6. stack=[0]
"0:end:6":   pop 0, result[0] += 6-6+1=1, prevTime=7. stack=[]

result = [2+1, 4] = [3, 4] ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(L) — L = number of logs |
| **Space** | O(n) — stack depth |

---

## Key Takeaway

> **Stack-based CPU time tracking: charge elapsed time to the top function on every event. Start events charge the paused function; end events charge the completing function. Classic simulation problem.**
