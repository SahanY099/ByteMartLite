<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;

class BaseResourceCollection extends ResourceCollection
{
    /**
     * Customize the pagination information for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array $paginated
     * @param  array $default
     * @return array
     */
    public function paginationInformation($request, $paginated, $default)
    {
        unset($default['meta']["links"]);

        $default = $this->convertKeysToCamelCase($default);
        $default['links'] = $this->convertLinksToPageNumbers($default['links']);

        return $default;
    }

    /**
     * Convert array keys to camelCase.
     *
     * @param  array $array
     * @return array
     */
    protected function convertKeysToCamelCase(array $array)
    {
        $result = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $value = $this->convertKeysToCamelCase($value);
            }
            $result[Str::camel($key)] = $value;
        }
        return $result;
    }

    protected function convertLinksToPageNumbers(array $links)
    {
        $result = [];
        foreach ($links as $key => $value) {
            if (is_string($value) && $value !== null) {
                parse_str(parse_url($value, PHP_URL_QUERY), $query);
                $result[$key] = isset($query['page']) ? (int) $query['page'] : null;
            } else {
                $result[$key] = $value;
            }
        }
        return $result;
    }
}
