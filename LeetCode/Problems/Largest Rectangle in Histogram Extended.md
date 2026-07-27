# Monotonic Stack Applications

Related: #84, #85, #42, #739, #496, #503, #907, #1944

---

## When to Use Monotonic Stack

Use when you need to find the **next/previous greater/smaller** element for each position.

### Templates

**Next Greater (decreasing stack):**
```
stack = []
FOR i ← 0 TO n-1:
    WHILE stack AND nums[stack.TOP()] < nums[i]:
        nextGreater[stack.POP()] = i
    stack.PUSH(i)
```

**Previous Smaller (increasing stack):**
```
stack = []
FOR i ← 0 TO n-1:
    WHILE stack AND nums[stack.TOP()] >= nums[i]:
        stack.POP()
    prevSmaller[i] = stack.TOP() IF stack ELSE -1
    stack.PUSH(i)
```

### Problem Mapping

| Problem | Find What | Stack Type |
|---------|----------|------------|
| Daily Temperatures (#739) | Next warmer | Decreasing |
| Largest Rectangle (#84) | Prev/next shorter bar | Increasing |
| Trapping Rain Water (#42) | Next taller | Decreasing |
| Sum Subarray Mins (#907) | Prev/next smaller | Increasing |
| Stock Span (#901) | Previous greater | Decreasing |
