<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\twigextensions;

use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\helpers\DateTimeHelper;

use DateTime;
use DateInterval;

use Technodelight\TimeAgo\Translation\RuleSet;
use Technodelight\TimeAgo\Translator;

/**
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators,
 * global variables, and functions. You can even extend the parser itself with
 * node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class FormBuilderTwigExtension extends \Twig_Extension
{
    // Public Methods
    // =========================================================================

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName()
    {
        return 'FormBuilder';
    }

    /**
     * Returns an array of Twig filters, used in Twig templates via:
     *
     *      {{ 'something' | someFilter }}
     *
     * @return array
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('json_decode', [$this, 'json_decode']),
            new \Twig_SimpleFilter('getClass', [$this, 'getClass']),
            new \Twig_SimpleFilter('timeAgo', [$this, 'getTimeAgo']),
        ];
    }

    /**
     * Returns an array of Twig functions, used in Twig templates via:
     *
     *      {% set this = someFunction('something') %}
     *
    * @return array
     */
    // public function getFunctions()
    // {
    //     return [
    //         new \Twig_SimpleFunction('someFunction', [$this, 'someInternalFunction']),
    //     ];
    // }

    /**
     * json_decode
     *
     * @param $json
     * @return mixed
     */
    public function json_decode($json) 
    {
        return json_decode($json);
    }

    public function getClass($object) 
    {
        return (new \ReflectionClass($object))->getShortName();
    }

    public function getTimeAgo($time)
    {
        $periods = array("second", "minute", "hour", "day", "week", "month", "year", "decade");
        $lengths = array("60","60","24","7","4.35","12","10");

        $now = time();
        $difference     = $now - strtotime($time);
        $tense         = "ago";

        for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
           $difference /= $lengths[$j];
        }

        $difference = round($difference);

        if($difference != 1) {
           $periods[$j].= "s";
        }

        return "$difference $periods[$j]";
    }
}