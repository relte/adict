#!/usr/bin/env bash

web-ext run --start-url https://english.stackexchange.com/questions/465198/a-word-for-an-object-that-doesnt-fit-in \
            --start-url about:debugging \
            --pref intl.locale.requested=en
