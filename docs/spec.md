# API

Overview

- Parentheses
- Variables
- Currying
- Types
- Number
- Infinity
- Bool
- Text
- List
- Map
- Univ
- Modules

Number

- (+ ...number) number
- (- ...number) number
- (\* ...number) number
- (/ number ...none_zero_number) number
- (max ...number) number
- (min ...number) number
- (% number number) number
- (^ number number) bool
- (to_number text) number
- (size list) number
- (average ...number) number
- (median ...number) number
- (neg number) number (negate -1) -1
- (tau) number
- (pi) number
- (euler) number
- (abs number) number
- (round number) number
- (floor number) number
- (ceil number) number
- (sqrt number) number
- (exp number) number
- (exmp1 number) number
- (sign number) number
- (trunc number) number
- (ln10 number) number
- (ln2 number) number
- (log10e number) number
- (log2e number) number
- (sqrt1_2 number) number
- (sqrt2 number) number
- (acos number) number
- (acosh number) number
- (asin number) number
- (asinh number) number
- (atan number) number
- (atan2 number) number
- (atanh number) number
- (cbrt number) number
- (clz32 number) number
- (cos number) number
- (cosh number) number
- (hypot number) number
- (imul number) number
- (log number) number
- (log10 number) number
- (log1p number) number
- (log2 number) number
- (fround number) number
- (sin number) number
- (sinh number) number
- (tan number) number
- (tanh number) number

Comparable

- (infinity) comparable
- (-infinity) comparable

Bool

- (= univ univ) bool
- (!= univ univ) bool
- (& univ univ) bool
- (| univ univ) bool
- (^^ univ univ) bool xor
- (! univ) bool
- (> comparable comparable) bool
- (>= comparable comparable) bool
- (< comparable comparable) bool
- (<= comparable comparable) bool
- (multiple number number) bool
- (any list univ) bool
- (all list univ) bool
- (has list univ) bool
- (is_type univ) bool
- (no_size list) bool

Text

- (regex_replace text text text) text
- (regex_remove text text) text
- (regex_has text text) text
- (type univ) text
- (to_text univ) text
- (join list text='') text
- (upper text) text
- (lower text) text
- (trim text) text
- (unit univ) text

List

- (flat list comparable=1) list
- (range number number number) list
- (repeat list number) list
- (split text text) list
- (split_every list number) list
- (splice ...) ...
- (to_list map) list
- (keys map) list
- (values map) list
- (regex_match text text) list

Map

- (++ ...map) map
- (reverse map) map
- (get map list) map
- (set map list univ) map
- (remove map list) map
- (each map univ) map
- (ieach map univ) map
- (kieach map univ) map
- (filter map univ) map
- (ifilter map univ) map
- (kifilter map univ) map
- (sort map univ) map
- (isort map univ) map
- (kisort map univ) map
- (to_map list) map
- (append map univ) map
- (prepend map univ) map
- (lefts map number) map
- (rights map number) map
- (group list) map

Univ

- (# ...univ) univ
- (: ...univ) univ
- (first map number) univ
- (last map number) univ
- (? ...univ) univ
- (identity univ) univ
- (reduce list) map
- (static) univ

## Overview

### Parentheses

Instead of using the syntax `f(x)` to call a function, we use the syntax `(f x)`, where `f` is the first element in the parentheses. For "`ex (round 10.23) 10`", the `ex` means that this is an example, the `(round 10.23)` is the example, and the `10` is the expected result of the example.

```
ex (round 10.23) 10
ex (round 10.63) 11
```

Even arithmetic uses this syntax of parentheses:

```
ex (+ 1 3) 4
ex (- 5 3) 2
ex (* 2 3) 6
ex (/ 15 5) 3
```

### Variables

Variable assignment is simply done by writing the variable name, a space, and then what that variable should be assigned to. `ex` is a special keyword and is the exception to this rule.

```
a 5
ex (+ a 10) 15
b 10
ex (+ a b) 15
```

Underscores are preferred to use as "spaces" in variable names.

```
fish_size 20
```

Variables cannot start with a number or a "`-`". Variables cannot have spaces, tabs, newlines, "`(`", "`)`", "`[`", "`]`", "`{`", "`}`", "`'`", "`@`", "`:`", ",", or "`.`" in any part of the name.

```
f` 10
f1 10
`test` 10
`sld`kfj 10
*&R&%FR^$%FASD 10
```

### Currying

Currying allows function structures to be built up over time.

```
a (+ 3)
ex (a 10) 13

b (a 10)
ex (b 20) 33
```

Values that are added later are pushed onto the front of the function (`10` was added later, but it is in front of the `3`).

```
ex (- 10 3) 7

a (- 3)

ex (a 10) 7
```

### Types

The types in Kiwi are:

- non_zero_number
- number
- comparable
- bool
- text
- list
- map
- univ

`non_zero_number` includes every number but zero. `non_zero_number` is a subset of `number`.

`number` includes every number, including floats. `number` is a subset of `comparable`.

`comparable` includes `number`, `infinity`, and `-infinity`. `comparable` is a subset of `univ`.

`bool` includes `true` and `false`. `bool` is a subset of `univ`.

`text` includes ordered groupings of characters. `text` is a subset of `list`.

`list` includes ordered groupings of `univ` with indexed `text` keys. `list` is a subset of `map`.

`map` includes ordered grouping of `univ` with settable 'text' keys. `map` is a subset of `univ`.

`univ`, which stands for universal, includes all types.

The subsets of types are as follows.

- non_zero_number => number => comparable => univ
- bool => univ
- text => list => map => univ

### Number

Numbers can be used as expected.

```
ex (+ 10 10) 20
ex (+ 10.5 10) 20.5
```

Units can be written at the end of a number. An underscore between the number and the unit is optional.

```
ex (+ 10_cm 50_cm) 60_cm
ex (+ 10_cm 50) 60_cm
ex (+ 10cm 50) 60cm
ex (+ 10cm 50_cm) 60cm
ex (+ 10_cm 50cm) 60_cm
```

Mixing units is not allowed unless you specify the conversion between them.

```
ft 12_in

ex (+ 3_ft 3_in) 39_in
```

Numbers can be written in binary (0b10), octal (0o2), hexidecimal (0x2), and dozenal (0d10). Still need to work out dozenal.

```
ex (+ 0b10 0o2 0x2) 0b110
ex (+ 0x2 0b10 0o2) 0x6
ex (+ 0xA_dots 0xA_dots) 0x14_dots
ex (+ 0xa_dots 0xa_dots) 0x14_dots
```

Decimals by default are not floating-point numbers.

```
ex (/ 0.6 0.2) 0.3
ex (/ 4 3) 4/3
```

To use floating-point numbers, use `0f` like so.

```
ex (/ 0f0.6 0f0.2) 0f2.9999999999999996
```

You can use underscores in numbers for readability.

```
129_349_100.12
```

### Infinity

`infinity` and `-infinity` are must useful for comparison functions.

```
ex (> infinity 3) true
ex (= infinity infinity) true
```

### Bool

Some examples (`&` is and, `|` is or, `=` checks for equality, etc.).

```
ex (& true true) true
ex (| false true) true
ex (= 3 3) true
ex (= [ 1 2 3 ] [ 1 2 3 ]) true
ex (= 6 3) false
ex (!= 3 3) false
```

All the following return a truthy value. The only two values that are falsey are `false` and `empty`.

```
ex (& 0 [] '' {}) true
```

### Text

Text is specified by single quotes.

```
some_text 'Example'
```

Parentheses within text will run as code.

```
ex 'Test (+ 1 3)' 'Test 4'
```

### List

Lists contain an ordered grouping of elements.

```
[ 1 2 3 ]
```

Dot syntax can be used to retrieve elements. The first element has an index of 1 rather than 0.

```
a [ 10 20 30 ]

ex a.1 10
ex a.2 20
ex a.3 30

b [ 10 20 [ 30 40 ] ]

ex b.3.2 40
```

Functions made for lists will always work for text.

```
ex (split_every [ 1 2 3 4 5 6 7 8 9 ] 3) [ [ 1 2 3 ] [ 4 5 6 ] [ 7 8 9 ] ]
ex (split_every '123456789' 3) [ '123' '456' '567' ]
```

### Map

Maps are like finite functions (a mapping between two sets).

```
m { a 3 b 10 }

ex m.a 3
ex m.b 10
```

Functions made for maps will always work for lists and text.

```
ex (++ 'Test' 's') 'Tests'
ex (++ [ 1 2 3 ] [ 4 ]) [ 1 2 3 4 ]
ex (++ { a 3 b 5 } { c 7 }) { a 3 b 5 c 7 }


ex (first 'Test') 'T'
ex (first [ 1 2 3 ]) 1
ex (first { a 3 b 5 }) { a 3 }
```

### Spread/Collect, Put, Get

The spread syntax (`...`) allows one to spread a map inside another map.

```
a [ 189 238 ]

ex [ 1 2 3 ...a ] [ 1 2 3 189 238 ]
ex [ ...a 1 2 3 ] [ 189 238 1 2 3 ]
ex [ 1 ...a 2 3 ] [ 1 189 238 2 3 ]

b { c 10 }

ex { a 3 b 8 ...b } { a 3 b 8 c 10 }
```

The put syntax (`@`) allows one to put a variable name inside a map to use the variable name as the key.

```
y 50

ex { x 10 @y } { x 10 y 50 }
```

The get syntax allows one to grab an element from a map with the specified name.

```
list [ 1 2 3 ]

[ a b c ] list

ex a 1
ex b 2
ex c 3

[ x ] list

ex x 1
```

```
map { g 1 h 2 }

{ g } map

ex g 1
```

Use `:` to rename the variable when getting from maps.

```
map { g 1 h 2 }

{ g:other } map

ex other 1
```

The collect syntax allows one to collect a submap inside a map during variable assignment.

```
list [ 1 2 3 4 5 6 7 ]

[ a b ...others ] list

ex a 1
ex b 2
ex others [ 3 4 5 6 7 ]
```

```
list [ 1 2 3 4 5 6 7 ]

[ a ...others b ] list

ex a 1
ex b 7
ex others [ 2 3 4 5 6 ]
```

```
list [ 1 2 3 4 5 6 7 ]

[ ...others a b ] list

ex a 6
ex b 7
ex others [ 1 2 3 4 5 ]
```

```
map { a 1 b 2 c 3 d 4 e 5 }

{ c ...others } map

ex c 3
ex others { a 1 b 2 d 4 e 5 }
```

### Univ

Use the `#` function to create a function.

```
a (# a (+ 10 a))

ex (a 50) 60
```

Use `=` to set default values.

```
a (# a=1 (+ 10 a))

ex (a) 10
ex a 10
```

### Modules

...
...
...

## Number

### (+ ...number) number

Add two or more numbers together

```
ex (+ 1 2) 3
ex (+ 5 10 20) 35
```

### (- ...number) number

Subtract two or more numbers together

```
ex (- 3 2) 1
ex (- 5 10 20) -25
```

### (\* ...number) number

Multiply two or more numbers together

```
ex (* 3 2) 6
ex (* 5 10 20) 1000
```

### (/ number ...number) number

Divide two or more numbers together

```
ex (/ 12 3) 4
ex (/ 96 6 4) 4
```

### (max ...number) number

Find the highest number.

```
ex (max 2 1 8 3) 8
```

### (min ...number) number

Find the lowest number.

```
ex (min 2 1 8 3) 1
```

### (% ...number) number

The modulo operator.

```
ex (% 9 3) 0
ex (% -20 7) 1
ex (% -20 7 1) 0
```

### (^ ...number) bool

The exponentiation operator.

```
ex (^ 3 2) 9
ex (^ 3 2 2) 81
ex (^ 3 10) 59049
```

### (to_number ...number) number

Convert text to a number

```
ex (to_number '10') 10
```

### (size list) number

Find how many elements a list has.

```
ex (size [ 8 2 5 ]) 3
ex (size 'Test') 4
ex (size { a 9 b 5 }) 2
```

### (average ...number) number

Find the average (mean).

```
ex (average 2 5 3 7) 4.25
```

### (median ...number) number

Find the median.

```
ex (median 2 5 3 7) 4
```

### (neg number) number

Negate the number.

```
ex (neg 39) -39
ex (neg -12) 12
```

### (tau) number

Returns τ. Please note that `tau` is a float.

```
ex tau 6.283185307179586
```

### (pi) number

Returns π. Please note that `pi` is a float.

```
ex pi 3.141592653589793
```

### (euler) number

Returns Euler's constant. Please note that `euler` is a float.

```
ex euler 2.718281828459045
```

### (abs number) number

Get the absolute value of a number

```
ex (abs -10) 10
ex (abs 10) 10
```

### (round number number) number

Round the number. Use the second parameter to set the accuracy.

```
ex (round 123_923_133.74) 123_923_134
ex (round 123_923_133.74 1000) 123_923_000
ex (round 123_923_133.74 0.1) 123_923_133.7
```

### (floor number) number

Round the number down. Use the second parameter to set the accuracy.

```
ex (floor 26.93) 26
ex (floor 26.93 10) 20
```

### (ceil number) number

Round the number up. Use the second parameter to set the accuracy.

```
ex (floor 26.23) 27
ex (floor 26.23 10) 30
```

### (sqrt number) number

Find the square root of the number

```
ex (sqrt 25) 5
```

### (exp number) number

### (exmp1 number) number

### (sign number) number

### (trunc number) number

### (ln10 number) number

### (ln2 number) number

### (log10e number) number

### (log2e number) number

### (sqrt1_2 number) number

### (sqrt2 number) number

### (acos number) number

### (acosh number) number

### (asin number) number

### (asinh number) number

### (atan number) number

### (atan2 number) number

### (atanh number) number

### (cbrt number) number

### (clz32 number) number

### (cos number) number

### (cosh number) number

### (hypot number) number

### (imul number) number

### (log number) number

### (log10 number) number

### (log1p number) number

### (log2 number) number

### (fround number) number

### (sin number) number

### (sinh number) number

### (tan number) number

### (tanh number) number

## Comparable

### (infinity) comparable

Positive infinity. Can be used for comparisons.

```
ex (min 9 2 infinity 3) 2
```

### (-infinity) comparable

Negative infinity. Can be used for comparisons.

```
ex (max 9 2 -infinity 3) 9
```

## Bool

### (= ...univ) bool

Check for equality of value.

```
ex (= 3 5) false
ex (= 3 3) true
ex (= { a 3 b 8 } { b 8 a 3 }) true
```

### (!= ...univ) bool

Check for inequality of value.

```
ex (!= 3 5) true
ex (!= 3 3) false
ex (!= { a 3 b 8 } { b 8 a 3 }) false
ex (!= { a 3 b 8 } { b 8 }) true
```

### (& ...univ) bool

The AND operator.

```
ex (& false false) false
ex (& true false) false
ex (& false true) false
ex (& true true) true
ex (& true true true) true
```

### (| ...univ) bool

The OR operator.

```
ex (| false false) false
ex (| true false) true
ex (| false true) true
ex (| true true) true
ex (| true false false) true
```

### (^^ univ univ) bool

The XOR operator.

```
ex (^^ false false) false
ex (^^ true false) true
ex (^^ false true) true
ex (^^ true true) false
ex (^^ true true false) true
```

### (! univ) bool

The NOT operator.

```
ex (! true) false
ex (! false) true
```

### (> comparable comparable) bool

The greater-than operator.

```
ex (> 3 6) false
ex (> 6 3) true
```

### (>= comparable comparable) bool

The greater-than-or-equal-to operator.

```
ex (>= 3 6) false
ex (>= 6 6) true
```

### (< comparable comparable) bool

The less-than operator.

```
ex (< 3 6) true
ex (< 6 3) false
```

### (<= comparable comparable) bool

The less-than-or-equal-to operator.

```
ex (<= 3 6) true
ex (<= 6 6) true
```

### (multiple ...number) bool

Previous name: even_div

True if the first number is a multiple of the second (and third, etc.).

```
ex (multiple 9 3) true
ex (multiple 12 4 3) true
```

### (any list univ) bool

Check if any elements in the list has the value or meets the requirement.

```
ex (any [ 1 3 5 7 4 ] (> 6)) true
ex (any [ 1 3 5 7 4 ] (> 10)) false
ex (any [ 1 3 5 7 4 ] 7) true
ex (any [ 1 3 5 7 4 ] 100) false
```

### (all list univ) bool

Check if all elements in the list meet the requirement.

```
ex (all [ 1 3 5 7 4 ] (> 6)) false
ex (all [ 1 3 5 7 4 ] (> 0)) true
```

<!-- ### (has list univ) bool

Check if an element is found in a list.

```
ex (has [ 1 2 3 ] 2) true
ex (has [ 'Frog' 'Fish' 'Fly' ] 'Bird') false
``` -->

### (is_type univ text) bool

Check if a value is of a certain type.

```
ex (is_type 234 'number') true
ex (is_type 'Test' 'number') false
```

### (no_size list) bool

See if a list has more than zero elements.

```
ex (no_size [ ]) true
ex (no_size '') true
ex (no_size { }) true
ex (no_size 0) false
ex (no_size [ 8 2 5 ]) false
ex (no_size 'Test') false
ex (no_size { a 9 b 5 }) false
```

## Text

# (regex_replace text text text) text

Replace text using regular expressions.

```
ex (regex_replace 'There are 387 days in a year' '(\d+)' '365.24225') 'There are 365.24225 days in a year'
```

# (regex_remove text text) text

Remove text using regular expressions.

```
ex (regex_remove 'This is a big mistake' 'big ') 'This is a mistake'
```

# (regex_has text text) text

Validate text by using a regular expression. See `regex_match`.

```
ex (regex_has 'There are 7 days in a week' '\d+') true
```

# (type univ) text

Get the type of value.

```
ex (type 2345) 'number'
ex (type [ 1 2 3 ]) 'list'
```

# (to_text univ) text

Convert a value to text.

```
ex (to_text '34') 34
```

# (join list text='') text

Join a list by a delimeter.

```
ex (join [ 'Frog' 'Fish' 'Fly' ] ', ') 'Frog, Fish, Fly'
```

# (upper text) text

Conver text to uppercase.

```
ex (upper 'test') 'TEST'
ex (upper 'Test') 'TEST'
```

# (lower text) text

Conver text to lowercase.

```
ex (lower 'Test') 'test'
ex (lower 'TEST') 'test'
```

# (trim text) text

Remove whitespace around text (spaces and tabs).

```
ex (trim '     Test     ') 'Test'
```

## List

### (flat list comparable=1) list

Flatten a list.

```
ex (flat [ 1 2 [ 3 ] ]) [ 1 2 3 ]
ex (flat [ 1 2 [ [ 3 ] ] ]) [ 1 2 [ 3 ] ]
ex (flat [ 1 2 [ [ 3 ] ] ] 2) [ 1 2 3 ]
ex (flat [ 1 2 [ [ 3 ] ] ] infinity) [ 1 2 3 ]
```

### (range number number number) list

Make a range of numbers.

```
ex (range 1 5) [ 1 2 3 4 5 ]
ex (range 1 5 0.5) [ 1 1.5 2 2.5 3 3.5 4 4.5 5 ]
```

### (repeat list number) list

Repeat a list a set number of times.

```
ex (repeat [ 1 2 3 ] 2) [ 1 2 3 1 2 3 ]
ex (repeat 'Hello' 3) 'HelloHelloHello'
```

### (split text text) list

Split text into a list.

```
ex (split 'a,b,c,d' ',') [ 'a' 'b' 'c' 'd' ]
```

### (split_every list number) list

Split a list every number of times.

```
ex (split_every [ 1 2 3 4 5 6 7 8 9 ] 3) [ [ 1 2 3 ] [ 4 5 6 ] [ 7 8 9 ] ]
ex (split_every 'Düsseldorf' 2) [ 'Dü' 'ss' 'el' 'do' 'rf' ]
```

### (to_list map) list

Convert a map (and text?) to a list.

```
ex (to_list { a 2 b 45 c 6 }) [ [ 'a' 2 ] [ 'b' 45 ] [ 'c' 6 ] ]
ex (to_list 'Test') [ 'T' 'e' 's' 't' ] ????????????????????????
```

### (keys map) list

Get the keys of a map.

```
ex (keys { a 3 b 6 }) [ 'a' 'b' ]
```

### (values map) list

Get the values of a map.

```
ex (values { a 3 b 6 }) [ 3 6 ]
```

### (regex_match text text) list

Get a list of matches by using a regular expression. See `regex_has`.

```
ex (regex_match 'There are 24 hours in a day and 7 days in a week.' '\d+') [ '24' '7' ]
ex (regex_match 'This is a sentence.' '\d+') []
```

## Map

### (++ ...map) map

Concat maps together.

```
ex (++ { a 34 b 65 } { c 5 }) { a 34 b 65 c 5 }
ex (++ [ 1 2 3 ] [ 4 5 6 ]) [ 1 2 3 4 5 6 ]
ex (++ 'This ' 'is ' 'a ' 'test.') 'This is a test.'
```

### (reverse map) map

Reverse a map.

```
ex (reverse { a 34 b 65 c 5 }) { c 5 b 65 a 34 }
ex (reverse [ 1 2 3 ]) [ 3 2 1 ]
ex (reverse 'Fish') 'hsiF'
```

### (get map list) map

Get a value at a position.

```
ex (get { a 40 b 2 } .a) {40
ex (get [ 80 23 12 ] .2) 23
ex (get 'Fish' .1) 'F'

ex (get { a [ 80 23 12 ] } .a.2) { a [ 80 23 12 ] }
```

Set a value at a position.

### (set map list univ) map

Set a value at a position.

```
ex (set { a 40 b 2 } .a 10) { a 10 b 2 }
ex (set [ 80 23 12 ] .2 1000) [ 80 1000 12 ]
ex (set 'Fish' .1 'D') 'Dish'

ex (set { a [ 80 23 12 ] } .a.2 1000) { a [ 80 1000 12 ] }

ex (set { a 40 b 2 } .a (+ 1)) { a 41 b 2 }
```

### (remove map list) map

Remove a value at a position.

```
ex (remove { a 40 b 2 } .a) { b 2 }
ex (remove [ 80 23 12 ] .2) [ 80 12 ]
ex (remove 'Fish' .1) 'ish'
```

### (each map univ) map

Apply a function on each element.

```
ex (each [ 1 2 3 ] (+ 1)) [ 2 3 4 ]
```

### (ieach map univ) map

Indexed each.

```
ex (each [ 93 54 23 ] (# v i [ i v ])) [ [ 1 93 ] [ 2 54 ] [ 3 23 ] ]
```

### (kieach map univ) map

Indexed each with key.

```
ex (each { a 1 b 2 c 3 } (# k v i [ (upper k) v ])) { A 1 B 2 C 3 }
```

### (filter map univ) map

Filter each element.

```
ex (each [ 1 2 3 ] (> 1)) [ 2 3 ]
```

### (ifilter map univ) map

Indexed filter on each element.

```
ex (each [ 93 54 23 ] (# v i )) [ [ 1 93 ] [ 2 54 ] [ 3 23 ] ]
```

### (kifilter map univ) map

Indexed filter with key on each element

```
ex (each { a 1 b 2 c 3 } (# k v i [ (upper k) v ])) { A 1 B 2 C 3 }
```

### (sort map univ) map

Sort a map by its values.

```
ex (sort { a 3 b 5 c 4 } >) { b 5 a 3 c 4 }
ex (sort [ 3 5 4 ] >) [ 5 4 3 ]
```

### (isort map univ) map

Sort a map by its values, with index

### (kisort map univ) map

Sort a map by its values, with index and key.

### (to_map list) map

Convert a list to a map.

```
ex (to_map [ [ 'a' 1 ] [ 'b' 2 ] ]) { a 1 b 2 }

```

### (append map text univ) map

Append an element.

```
ex (append { a 1 b 2 } 'c' 3) {a 1 b 2 c 3 }
ex (append [ 1 2 3 ] 4) [ 1 2 3 4 ]
ex (append 'Test' 's') 'Tests'

```

### (prepend map univ) map

Prepend an element.

```
ex (prepend { a 1 b 2 } 'c' 3) { c 3 a 1 b 2 }
ex (prepend [ 1 2 3 ] 4) [ 4 1 2 3 ]
ex (prepend (lower 'Oats') 'G') 'Goats'
```

### (lefts map number) map

Get all but the last element.

```
ex (lefts { a 1 b 2 c 3 }) { a 1 b 2 }
ex (lefts [ 1 2 3 ]) [ 1 2 ]
ex (lefts 'Tests') 'Test'
```

Use the second parameter to cut off more than just the last element.

```
ex (lefts 'Big Fish' 5) 'Big'
```

### (rights map numer) map

Get all but the first element.

```
ex (rights { a 1 b 2 c 3 }) { b 2 c 3 }
ex (rights [ 1 2 3 ]) [ 2 3]
ex (rights 'Fish') 'ish'
```

Use the second parameter to cut off more than just the first element.

```
ex (rights 'Big Fish' 4) 'Fish'
```

### (group list univ) map

Group a list into a map.

```
ex (group [ 1 2 3 ] (: (= 3) (? 'group1' 'group2')) {"group2":[1,2],"group1":[3]}
```

## Univ

### (# ...univ) univ

Define a function.

```
fn (# a b (+ a (* b 2)))

ex (fn 3 6) 15
```

Use `=` to set default values.

```
a (# a=1 (+ 10 a))

ex (a) 10
ex a 10
```

### (: ...univ) univ

Thread values through each other.

```
ex (: 1 (+ 2)) 3
ex (: 1 (+ 2) (- 3)) 0
ex (: 'Test' size (+ 10)) 14
```

### (first map number) univ

Get the first element.

```
ex (first { a 1 b 2 c 3 }) 1
ex (first [ 1 2 3 ]) 1
ex (first 'Tests') 'T'
```

Use the second parameter to get x number of first elements.

```
ex (first 'Big Fish' 3) 'Big'
```

### (last map number) univ

Get the last element.

```
ex (last { a 1 b 2 c 3 }) 1
ex (last [ 1 2 3 ]) 1
ex (last 'Tests') 'T'
```

Use the second parameter to get x number of last elements.

```
ex (last 'Big Fish' 4) 'Fish'
```

### (? ...univ) univ

Used for conditionals.

```
ex (? true 3 9) 3
ex (? false 3 9) 9
ex (? false 3 false 9 true 4 false 5) 4
ex (? false 3 false 9 false 4 10) 10
```

### (identity univ) univ

Returns its first parameter.

```
ex (identity 3) 3
```

### (reduce list univ univ) univ

Reduce a list.

```

(reduce + [ 1 2 3 ]) 6

(reduce + [ 1 2 3 ] 10) 16
```

### (static) univ

Get the static state.

```
important_lib static._files.lib2.index_kw
```
