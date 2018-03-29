<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\models;

use Craft;
use craft\base\Model;

class Note extends Model
{
    // Public Properties
    // =========================================================================

    public $id;
    public $note;
    public $entryId;
    public $authorId;
    public $dateCreated;

    public $author;

    /**
     * Get author of the note
     *
     * @return \craft\elements\User|null
     */
    public function getAuthor()
    {
        return Craft::$app->users->getUserById($this->authorId);
    }
}
