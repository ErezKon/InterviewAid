# String Parsing Pattern

Related: #8 atoi, #65 Valid Number, #68 Text Justification

---

## atoi Template

```
FUNCTION myAtoi(s):
    i = 0
    n = len(s)

    // 1. Skip whitespace
    WHILE i < n AND s[i] == ' ': i += 1

    // 2. Handle sign
    sign = 1
    IF i < n AND s[i] in '+-':
        sign = -1 IF s[i] == '-' ELSE 1
        i += 1

    // 3. Convert digits
    result = 0
    WHILE i < n AND s[i].isdigit():
        digit = int(s[i])
        // Overflow check
        IF result > (INT_MAX - digit) / 10:
            RETURN INT_MAX IF sign == 1 ELSE INT_MIN
        result = result * 10 + digit
        i += 1

    RETURN sign * result
```

### Common Edge Cases

- Leading/trailing whitespace
- Multiple signs
- Overflow/underflow
- Non-digit characters
- Empty or whitespace-only string
