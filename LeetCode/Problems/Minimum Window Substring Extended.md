# Sliding Window Pattern Collection

Related: #3, #76, #209, #239, #340, #424, #567, #904, #1004, #1438

---

## Sliding Window Templates

### Variable-Size Window (find min/max window with condition)

```
left = 0
FOR right ← 0 TO n - 1:
    // Expand: add nums[right] to window state
    WHILE window is invalid:
        // Shrink: remove nums[left] from window state
        left += 1
    // Update answer with current valid window
```

### Fixed-Size Window

```
// Initialize window of size k
FOR right ← k TO n - 1:
    // Add nums[right], remove nums[right - k]
    // Update answer
```

### "At Most K" Trick (for "Exactly K" problems)

```
exactlyK(arr, k) = atMostK(arr, k) - atMostK(arr, k - 1)
```

| Problem | Window Type | Condition |
|---------|------------|-----------|
| Min Window Substring (#76) | Variable, shrink | Contains all chars of t |
| Longest Without Repeating (#3) | Variable, shrink | All unique chars |
| Max Consecutive Ones III (#1004) | Variable, shrink | At most k zeros |
| Sliding Window Max (#239) | Fixed | Track max with deque |
